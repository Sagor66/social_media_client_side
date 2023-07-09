import { useContext, useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { AuthContext } from "../../providers/AuthProvider";
import PostCard from "../Home/PostCard";

const Timeline = () => {
  const { user } = useContext(AuthContext);
  const [userPost, setUserPost] = useState([]);

  let {
    data: postData,
    loading: postLoading,
    error: postError,
    setData: postSetData,
  } = useGetData(`${import.meta.env.VITE_BASE_URL}/posts`);

  useEffect(() => {
    const data = postData.filter((post) => user.id === post.user_id);
    setUserPost(data);
  }, [user, postData]);

  console.log(userPost);

  return (
    <div className="my-32 py-10">
      {userPost.map((post) => (
        <PostCard post={post} userData={user}></PostCard>
      ))}
    </div>
  );
};

export default Timeline;
