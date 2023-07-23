import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import useGetData from "../../hooks/useGetData";
import axios from "axios";
import PostForm from "./PostForm";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, fetchPosts } from "../../features/postSlice";
import { createReaction } from "../../features/reactionSlice";

const Post = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/users`);

  const [like, setLike] = useState(false);
  let { user } = useContext(AuthContext);
  const {
    isLoading,
    posts: postData,
    error,
  } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      user = JSON.parse(localStorage.getItem("user"));
    }
  }, []);

  // Get all posts redux
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchPosts(user.id));
    }
  }, [dispatch, user?.id]);

  // Handling form submission for posting
  const handleFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const textBox = form.textBox.value;

    const data = { user_id: user?.id, description: textBox };

    if (user) {
      dispatch(createPost(data));
    } else {
      toast.error("Please Login To Post");
    }
  };

  // DELETE post
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  // Like a post
  const handleLike = (post) => {
    const data = { user_id: user?.id, post_id: post.id, reaction: "like" };
    if (user) {
      dispatch(createReaction(data))
      .then(() => {
        dispatch(fetchPosts(user?.id))
      })
    } else {
      toast.error("Login First");
    }
  };

  console.log({ postData })

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
