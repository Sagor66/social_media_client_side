import SingleComment from "./SingleComment";

const CommentCard = ({ post, postId, postComments, setReply, reply }) => {
  // console.log({postComments})

  return (
    <div className="py-10">
      {postComments?.map((comment) => (
        <SingleComment key={comment.id} comment={comment} post={post} setReply={setReply} reply={reply}></SingleComment>
      ))}
    </div>
  );
};

export default CommentCard;
