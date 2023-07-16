
const PostForm = ({ formAction, handleFormData, defaultValue }) => {

  return (
    <form className="px-10" onSubmit={handleFormData}>
      <div className="form-control">
        <textarea
          type="text"
          name="textBox"
          className="textarea textarea-info w-full min-h-[200px] text-lg"
          placeholder="Whats in your mind?"
          defaultValue={defaultValue ? defaultValue : ""}
          required
        ></textarea>
      </div>
      <div className="form-control my-8">
        <input className="btn-primary" type="submit" value={`${formAction}`} />
      </div>
    </form>
  );
};

export default PostForm;
