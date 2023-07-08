import { useEffect, useState } from "react";

const PostCard = ({ post, userData }) => {
  const [user, setUser] = useState([]);
  const [dateTime, setDateTime] = useState('');


  useEffect(() => {
    const postUser = userData.find((user) => post.user_id === user.id);
    setUser(postUser);
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

    setDateTime(formattedDate)
  }, [post]);

  return (
    <div className="my-16 px-10 py-10 bg-gradient-to-tr from-sky-100 to-white rounded-xl shadow-xl">
      {post && user && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-3xl">
              <span className=" border-b-4 border-sky-500 pb-1">Posted By: </span>
              <span className="uppercase font-bold  border-b-4 border-sky-500 pb-1">{user.name}</span>
              <span className="text-gray-400 ml-3">#{user.id}</span>
            </h4>
            <p className="text-sm">Posted on: {dateTime}</p>
          </div>
          <p className="text-xl">{post.description}</p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
