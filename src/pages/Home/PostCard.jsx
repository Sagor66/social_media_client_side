import { useEffect, useState } from "react";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { BiCommentDetail, BiSolidCommentDetail } from "react-icons/bi";

const PostCard = ({ post, userData }) => {
  const [user, setUser] = useState([]);
  const [dateTime, setDateTime] = useState("");
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState(false);

  useEffect(() => {
    if (Array.isArray(userData)) {
      const postUser = userData.find((user) => post.user_id === user.id);
      setUser(postUser);
    } else {
      setUser(userData);
    }
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

  const handleComment = () => {
    setComment(!comment);
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
          <div className="bg-white px-10 rounded-b-2xl flex items-center gap-16">
            <button
              onClick={handleLike}
              className="text-4xl text-sky-500 py-5 flex flex-row-reverse items-center gap-2 w-[135px]"
            >
              {like ? (
                <>
                  <span className="font-bold">Liked</span>
                  <BsFillHandThumbsUpFill></BsFillHandThumbsUpFill>
                </>
              ) : (
                <>
                  <span className="font-bold">Like</span>
                  <BsHandThumbsUp></BsHandThumbsUp>
                </>
              )}
            </button>
            <button
              onClick={handleComment}
              className="text-4xl text-sky-500 py-5 flex flex-row-reverse items-center gap-2"
            >
              {" "}
              <span className="font-bold">Comment</span>
              {!comment ? (
                <BiCommentDetail></BiCommentDetail>
              ) : (
                <BiSolidCommentDetail></BiSolidCommentDetail>
              )}
            </button>
            <div>
              {comment && (
                <div>
                  <h2>SSS</h2>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
