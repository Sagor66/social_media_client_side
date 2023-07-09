import React, { useContext, useEffect, useState } from "react";
import PostCard from "./PostCard";
import useGetData from "../../hooks/useGetData";
import usePostData from "../../hooks/usePostData";
import axios from "axios";
import PostForm from "./PostForm";
import { AuthContext } from "../../providers/AuthProvider";

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

  const [postData, setPostData] = useState([])
  const [posted, setPosted] = useState(false)
  const { user } = useContext(AuthContext)
  

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
    .then(res => {
      setPostData(res.data)
      setPosted(false)
    })
    .catch(error => console.log(error.message))
  }, [posted])

  console.log(postData)

  const handleFormData = (event) => {
    event.preventDefault();
    const form = event.target;
    const textBox = form.textBox.value;
  
    const data = { user_id: user.id, description: textBox };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/posts`, data)
      .then((res) => {
        // postSetData([...postData, data]);
        setPostData([...postData, res.data])
        setPosted(true)
        console.log(res);
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <PostForm formAction={'Post'} handleFormData={handleFormData}></PostForm>
      <div className="my-32">
        <h2 className="text-center text-5xl text-sky-500 font-bold bg-gradient-to-l from-sky-200 to-gray-50 px-20 py-5 w-fit mx-auto mb-10">
          News Feed
        </h2>
        {postData.map((post) => (
          <PostCard key={post.id} post={post} userData={userData}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Post;
