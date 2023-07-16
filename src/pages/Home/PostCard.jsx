import { useContext, useEffect, useState } from "react";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { BiCommentDetail, BiEdit, BiSolidCommentDetail } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import PostForm from "./PostForm";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import CommentCard from "./CommentCard";

const PostCard = ({ post, userData, handleDelete, handleLike, like }) => {
  const { user: loggedUser } = useContext(AuthContext);
  const [postData, setPostData] = useState([]);
  const [user, setUser] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [comment, setComment] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (Array.isArray(userData)) {
      const postUser = userData.find((user) => post.user_id === user.id);
      setUser(postUser);
    } else {
      setUser(userData);
    }
  }, [post, userData]);

  useEffect(() => {
    const formattedDate = new Date(post.created_at).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    setDateTime(formattedDate);
  }, [post]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/posts?user_id=${loggedUser?.id}`)
      .then((res) => {
        setPostData(res.data);
        setUpdated(false);
      })
      .catch((error) => console.log(error.message));
  }, [updated]);

  const handleComment = () => {
    setComment(!comment);
  };

  const handleMouseEnter = () => {
    if (loggedUser) {
      if (loggedUser.id == post.user_id) {
        setIsHovered(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleFromData = (event) => {
    event.preventDefault();
    const form = event.target;
    const textBox = form.textBox.value;

    const data = { user_id: user?.id, description: textBox };

    if (user) {
      axios
        .patch(`${import.meta.env.VITE_BASE_URL}/posts/${post.id}`, data)
        .then((res) => {
          const remainingData = postData.filter((data) => post.id !== data.id);
          const updatedData = [res.data, ...remainingData];
          post.description = res.data.description;
          setPostData(updatedData);
          setUpdated(true);
          setEdit(!edit);
        })
        .catch((error) => console.log(error.message));
    } else {
      toast.error("Please Login To Post");
    }
  };

  const handleCommentFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const textBox = form.textBox.value;

    const data = {
      user_id: loggedUser?.id,
      post_id: post?.id,
      description: textBox,
    };

    if (user) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/comments`, data)
        .then((res) => {
          const updatedData = [...post.comments, res.data];
          post.comments = updatedData;
          const remaining = postData.filter((data) => post.id !== data.id);
          setPostData([...remaining, post]);
          setComment(!comment);
        })
        .catch((error) => console.log(error.message));
    } else {
      toast.error("Please Login To Comment");
    }
  };

  return (
    <div
      className="mb-16 pt-10 bg-gradient-to-tr from-sky-100 to-white rounded-xl shadow-xl relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {post && user && (
        <>
          <div>
            <div className="flex items-center justify-between px-10 mb-3">
              <h4 className="text-3xl">
                <span className=" border-b-4 border-sky-500 pb-1">
                  Posted By:{" "}
                </span>
                <span className="uppercase font-bold  border-b-4 border-sky-500 pb-1">
                  {user.name}
                </span>
                <span className="text-gray-400 ml-3">#{user.id}</span>
              </h4>
              <p className="text-sm">Posted on: {dateTime}</p>
            </div>
            <p className="text-xl py-10 px-10">{post.description}</p>
          </div>
          {edit && (
            <PostForm
              formAction={"Update Post"}
              handleFormData={handleFromData}
              defaultValue={post.description}
            ></PostForm>
          )}
          <div className="bg-white px-10 rounded-b-2xl">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-16">
                <button
                  onClick={() => handleLike(post)}
                  className="text-4xl text-sky-500 py-5 flex flex-row-reverse items-center gap-2"
                >
                  {post.like >= 1 ? (
                    <>
                      <span className="bg-sky-100 p-4 rounded-full">
                        {post.number_of_reactions}
                      </span>
                      <span className="font-bold">Liked</span>
                      <BsFillHandThumbsUpFill></BsFillHandThumbsUpFill>
                    </>
                  ) : (
                    <>
                      <span className="bg-sky-100 p-4 rounded-full">
                        {post.number_of_reactions}
                      </span>
                      <span className="font-bold">Like</span>
                      <BsHandThumbsUp></BsHandThumbsUp>
                    </>
                  )}
                </button>
                <button
                  onClick={handleComment}
                  className="text-4xl text-sky-500 py-5 flex flex-row-reverse items-center gap-2"
                >
                  {" "}
                  <span className="font-bold">Comment</span>
                  {!comment ? (
                    <BiCommentDetail></BiCommentDetail>
                  ) : (
                    <BiSolidCommentDetail></BiSolidCommentDetail>
                  )}
                </button>
              </div>
              <p className="text-sky-500">
                Total Comments: {post.number_of_comments}
              </p>
            </div>
            <div>
              {comment && (
                <div className="py-10">
                  <PostForm
                    formAction={"Submit Comment"}
                    handleFormData={handleCommentFormData}
                  ></PostForm>
                </div>
              )}
            </div>
            <div>
              <CommentCard
                post={post}
                postId={post.id}
                postComments={post.comments}
                setReply={setComment}
                reply={comment}
              ></CommentCard>
            </div>
            <div
              className={`bg-white text-4xl text-sky-500 py-3 px-10 rounded-xl absolute top-2 left-1/2 shadow-xl ${
                isHovered ? "" : "hidden"
              }`}
            >
              <button onClick={handleEdit} className="mr-10">
                <BiEdit></BiEdit>
              </button>
              <button onClick={() => handleDelete(post.id)}>
                <AiOutlineDelete></AiOutlineDelete>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
