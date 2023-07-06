import React from "react";

const Post = () => {

    const handleFormData = (event) => {
        event.preventDefault()
        const form = event.target
        const textBox = form.textBox.value

        console.log({ textBox })
    }

  return (
    <>
      <form onSubmit={handleFormData}>
        <div className="form-control">
          <textarea
            type="text"
            name="textBox"
            className="textarea textarea-info w-full min-h-[200px]"
            placeholder="Whats in your mind?"
            required
          ></textarea>
          {/* <input
            type="text"
            placeholder="name"
            className="input input-bordered"
            {...register("class_name", { required: true })}
          /> */}
        </div>
        <div className="form-control my-8">
          <input className="btn-primary" type="submit" value="Post" />
        </div>
      </form>
    </>
  );
};

export default Post;
