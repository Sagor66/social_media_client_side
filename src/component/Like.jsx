import { useEffect, useState } from "react";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

const Like = ({ handleLike, post, like }) => {
//   const [like, setLike] = useState(false);

  useEffect;

  return (
    <button
      onClick={() => handleLike(post.id)}
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
  );
};

export default Like;
