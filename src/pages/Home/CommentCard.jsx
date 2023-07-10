const CommentCard = ({ postId, postComments }) => {

    

  return (
    <div>
      {
        postComments.map(comment => (
            <div>
                <p>{comment.description}</p>
            </div>
        ))
      }
    </div>
  );
};

export default CommentCard;
