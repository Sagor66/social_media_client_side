import React, { useEffect } from "react";
import PostCard from "./PostCard";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import axios from "axios";

const Post = () => {
  let {
    data: postData,
    loading: postLoading,
    error: postError,
    setData: postSetData,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/posts`);
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/users`);

  const handleFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const textBox = form.textBox.value;

    const data = {"user_id": 1, description: textBox}

    axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, data)
    .then(res => {
      postSetData([...postData, res.data])
      console.log(res)
    })
    .catch(error => console.log(error.message))
  };

  // useEffect(() => {
  //   postSetData([...postData])
  // }, [postData])

  return (
    <>
      <form onSubmit={handleFormData}>
        <div className="form-control">
          <textarea
            type="text"
            name="textBox"
            className="textarea textarea-info w-full min-h-[200px]"
            placeholder="Whats in your mind?"
            required
          ></textarea>
          {/* <input
            type="text"
            placeholder="name"
            className="input input-bordered"
            {...register("class_name", { required: true })}
          /> */}
        </div>
        <div className="form-control my-8">
          <input className="btn-primary" type="submit" value="Post" />
        </div>
        <div className="my-32">
          <h2 className="text-center text-5xl text-sky-500 font-bold bg-gradient-to-l from-sky-200 to-gray-50 px-20 py-5 w-fit mx-auto mb-10">
            News Feed
          </h2>
          {postData.map((post) => (
            <PostCard key={post.id} post={post} userData={userData}></PostCard>
          ))}
        </div>
      </form>
    </>
  );
};

export default Post;
