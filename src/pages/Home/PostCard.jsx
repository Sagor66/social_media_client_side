import { useEffect, useState } from "react";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

const PostCard = ({ post, userData }) => {
  const [user, setUser] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [like, setLike] = useState(false);

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

    setDateTime(formattedDate);
  }, [post]);

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div className="mb-16 pt-10 bg-gradient-to-tr from-sky-100 to-white rounded-xl shadow-xl">
      {post && user && (
        <>
          <div>
            <div className="flex items-center justify-between px-10 mb-3">
              <h4 className="text-3xl">
                <span className=" border-b-4 border-sky-500 pb-1">
                  Posted By:{" "}
                </span>
                <span className="uppercase font-bold  border-b-4 border-sky-500 pb-1">
                  {user.name}
                </span>
                <span className="text-gray-400 ml-3">#{user.id}</span>
              </h4>
              <p className="text-sm">Posted on: {dateTime}</p>
            </div>
            <p className="text-xl py-10 px-10">{post.description}</p>
          </div>
          <div className="bg-white px-10 rounded-b-2xl">
            <button
              onClick={handleLike}
              className="text-4xl text-blue-500 py-5"
            >
              {like ? (
                <BsFillHandThumbsUpFill></BsFillHandThumbsUpFill>
              ) : (
                <BsHandThumbsUp></BsHandThumbsUp>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
