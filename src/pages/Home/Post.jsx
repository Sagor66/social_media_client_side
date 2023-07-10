import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import axios from "axios";
import PostForm from "./PostForm";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const Post = () => {
  // let {
  //   data: postData,
  //   loading: postLoading,
  //   error: postError,
  //   setData: postSetData,
  // } = useGetData(`${import.meta.env.VITE_BASE_URL}/posts`);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/users`);

  const [postData, setPostData] = useState([]);
  const [posted, setPosted] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [like, setLike] = useState(false);
  const [reactionId, setReactionId] = useState(0);
  const { user } = useContext(AuthContext);
  
  // GET all posts 
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/posts`)
      .then((res) => {
        setPostData(res.data);
        // console.log({data:res.data})
        // console.log({comments: res.data.comments})
        setPosted(false);
        setDeleted(false);
      })
      .catch((error) => console.log(error.message));
  }, [posted, deleted]);
  

  // GET all reactions
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/reactions`);
  }, []);

  // console.log(postData);

  // Handling form submission for posting
  const handleFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const textBox = form.textBox.value;

    const data = { user_id: user?.id, description: textBox };

    if (user) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/posts`, data)
        .then((res) => {
          // postSetData([...postData, data]);
          setPostData([...postData, res.data]);
          setPosted(true);
          console.log(res);
        })
        .catch((error) => console.log(error.message));
    } else {
      toast.error("Please Login To Post");
    }
  };

  // DELETE post
  const handleDelete = (id) => {
    if (user) {
      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
        .then((res) => {
          const remainigData = postData.filter((post) => post.id !== id);
          setPostData([...remainigData]);
          setDeleted(true);
        })
        .catch((error) => console.log(error));
    }
  };

  // Like a post
  const handleLike = (id) => {
    const data = { user_id: user?.id, post_id: id, reaction: "like" };
    // console.log(data);

    if (user) {
      axios
        .post(`${import.meta.env.VITE_BASE_URL}/reactions`, data)
        .then((res) => {
          setReactionId(res.data.id);
          if (res.data.reaction === "like") {
            setLike(!like);
          }
          console.log(res.data);
        })
        .then((error) => console.log(error));
    } else {
      toast.error("Login First")
    }
  };

  return (
    <div>
      <PostForm formAction={"Post"} handleFormData={handleFormData}></PostForm>
      <div className="my-32">
        <h2 className="text-center text-5xl text-sky-500 font-bold bg-gradient-to-l from-sky-200 to-gray-50 px-20 py-5 w-fit mx-auto mb-10">
          News Feed
        </h2>
        {postData.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            userData={userData}
            handleDelete={handleDelete}
            handleLike={handleLike}
            like={like}
          ></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Post;
