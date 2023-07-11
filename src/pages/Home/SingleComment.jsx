import { useContext, useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const SingleComment = ({ comment, post }) => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/users`);

  const { user: loggedUser } = useContext(AuthContext);

  const [userComment, setUserComment] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [modifiedPost, setModifiedPost] = useState(post);

//   console.log({ modifiedPost });

  useEffect(() => {
    const user = userData.find((user) => user.id === comment.user_id);
    setUserComment(user);
  }, [userData]);



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
          const updatedPost = { ...post };
          updatedPost.comments = updatedPost.comments.filter(
            (comment) => comment.id !== id
          );

          console.log({updatedPost})
          console.log({updatedPostComment: updatedPost.comments})
          //   const remainigData = postData.filter((post) => post.id !== id);
          //   setPostData([...remainigData]);
          //   setDeleted(true);
        })
        .catch((error) => console.log(error));
    }
  };


  const handleLike = () => {
    const data = { user_id: loggedUser?.id, post_id: post.id, comment_id: comment.id, reaction: "like" };

    if (loggedUser) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/comment_reactions`, data)
        .then((res) => {
          // console.log({ postData })
          console.log({ response: res.data });
        //   const manipulatedData = postData.find(data => data.id === id)
        //   const mainData = postData.filter(data => data.id !== id)
          // console.log({ manipulatedData })
          // console.log({ mainData })
          // setPostData([...mainData, manipulatedData])
          if (res.data.reaction === "like") {
            toast.success('Liked')
            
            // setLike(!like);
          } else {
            toast.success('Unliked')
          }
        });
    } else {
      toast.error("Login First");
    }
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
        <button onClick={handleLike} className="mr-8 mt-3 hover:underline">Like</button>
        <button className="hover:underline">Reply</button>
      </div>
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
