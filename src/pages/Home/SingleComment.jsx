import { useContext, useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchComments } from "../../features/commentSlice";
import { fetchPosts } from "../../features/postSlice";
import { createCommentReaction } from "../../features/commentReactionSlice";

const SingleComment = ({ comment, post, setReply, reply }) => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/users`);

  const { user: loggedUser } = useContext(AuthContext);

  const [userComment, setUserComment] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [likedComment, setLikedComment] = useState([])
  // const [commentData, setCommentData] = useState([])
  const {
    isLoading,
    comments: commentData,
    error,
  } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = userData.find((user) => user.id === comment.user_id);
    setUserComment(user);
  }, [comment.user_id, userData]);

  // Get all comments
  useEffect(() => {
    if (loggedUser?.id) {
      dispatch(fetchComments(loggedUser.id));
    }
  }, [dispatch, loggedUser?.id]);

  useEffect(() => {
    let likedComment = commentData.find(c => c.id === comment.id)
    setLikedComment(likedComment)
  }, [comment.id, commentData])


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
      dispatch(deleteComment(id)).then(() => {
        dispatch(fetchPosts(loggedUser?.id));
      });
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
      dispatch(createCommentReaction(data))
      .then(() => {
        dispatch(fetchComments(loggedUser?.id))
      })
    } else {
      toast.error("Login First");
    }
  };

  const handleReply = () => {
    setReply(!reply);
  };

  console.log({ likedComment })

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
          <span className="mr-2 bg-white px-3 py-1">
            {likedComment?.number_of_reactions}
          </span>
          {likedComment?.like === 1 ? "Liked" : "Like"}
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
