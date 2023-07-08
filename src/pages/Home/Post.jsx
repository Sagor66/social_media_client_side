import React from "react";
import PostCard from "./PostCard";
import useGetData from "../../hooks/useGetData";

const Post = () => {
  const {
    data: postData,
    loading: postLoading,
    error: postError,
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

    console.log({ textBox });
  };

  // console.log({ postData });
  // console.log({ userData });

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
          {
            postData.map(post => (
              <PostCard key={post.id} post={post} userData={userData}></PostCard>
            ))
          }
        </div>
      </form>
    </>
  );
};

export default Post;
