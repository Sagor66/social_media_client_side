import SingleComment from "./SingleComment";

const CommentCard = ({ post, postId, postComments }) => {
  // console.log({postComments})

  return (
    <div className="py-10">
      {postComments?.map((comment) => (
        <SingleComment key={comment.id} comment={comment} post={post}></SingleComment>
      ))}
    </div>
  );
};

export default CommentCard;
