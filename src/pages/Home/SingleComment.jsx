import { useContext, useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const SingleComment = ({ comment, post, setReply, reply }) => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/users`);

  const { user: loggedUser } = useContext(AuthContext);

  const [userComment, setUserComment] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [commentData, setCommentData] = useState([])

  const { postData, setPostData, restState, setResetState } =
    useContext(AuthContext);

  useEffect(() => {
    const user = userData.find((user) => user.id === comment.user_id);
    setUserComment(user);
  }, [userData]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/comments?user_id=${loggedUser?.id}`,)
    .then(res => {
      const newData = res.data.find(data => data.id === comment.id)
      setCommentData(newData)
    })
  }, [])

  const handleMouseEnter = () => {
    if (loggedUser) {
      if (loggedUser.id === comment.user_id || loggedUser.id === post.user_id) {
        setIsHovered(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  //   console.log(userComment);

  const handleEdit = () => {};

  const handleDelete = (id) => {
    if (loggedUser.id === comment.user_id || loggedUser.id === post.user_id) {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/comments/${id}`)
        .then((res) => {
          console.log({ response: res });
          if (res.status == 200) {
            toast.success("Successfully Deleted!");
          }

          post.comments = post.comments.filter(
            (comment) => comment.id !== res.data.id
          );
          const newData = post;
          const remainingData = postData.filter((data) => data.id !== post.id);
          setPostData([...remainingData, newData]);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleLike = () => {
    const data = {
      user_id: loggedUser?.id,
      post_id: post.id,
      comment_id: comment.id,
      comment_reaction: "like",
    };

    if (loggedUser) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/comment_reactions`, data)
        .then((res) => {
          console.log({ response: res.data });
          if (res.data.comment_reaction === "like") {
            commentData.like = 1
            commentData.number_of_reactions += 1
            toast.success("Liked");
          } else {
            commentData.like = 0
            commentData.number_of_reactions -= 1
            toast.success("Unliked");
          }
        });
    } else {
      toast.error("Login First");
    }
  };

  const handleReply = () => {
    setReply(!reply);
  };

  return (
    <div
      className="bg-sky-100 px-4 py-6 ml-10 mb-5 rounded-lg relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h5 className="text-2xl mb-6">
        Commented by:{" "}
        <span className="uppercase font-bold border-b-4 border-b-sky-500">
          {userComment?.name}
        </span>
      </h5>
      <div className="text-sky-500 text-xl font-bold ml-10">
        <p className="text-lg text-black font-normal">{comment.description}</p>
        <button onClick={handleLike} className="mr-8 mt-3 hover:underline">
          <span className="mr-2 bg-white px-3 py-1">{commentData.number_of_reactions}</span>
          { commentData.like === 1 ? 'Liked' : 'Like' }
        </button>
        <button onClick={handleReply} className="hover:underline">
          Reply
        </button>
      </div>
      {/* {editComment && (
            <PostForm
              formAction={"Update Post"}
              handleFormData={handleFromData}
              defaultValue={post.description}
            ></PostForm>
          )} */}
      <div
        className={`text-4xl text-sky-500 absolute top-2 right-2 ${
          isHovered ? "" : "hidden"
        }`}
      >
        {/* <button onClick={handleEdit} className="mr-6">
          <BiEdit></BiEdit>
        </button> */}
        <button onClick={() => handleDelete(comment.id)}>
          <AiOutlineDelete></AiOutlineDelete>
        </button>
      </div>
    </div>
  );
};

export default SingleComment;
