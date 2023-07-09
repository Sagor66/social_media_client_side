import { useContext, useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const PostForm = ({ handleFormData }) => {
//   let {
//     data: postData,
//     loading: postLoading,
//     error: postError,
//     setData: postSetData,
//   } = useGetData(`${import.meta.env.VITE_BASE_URL}/posts`);


//   const [postData, setPostData] = useState([])

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
//     .then(res => setPostData(res.data))
//     .catch(error => console.log(error.message))
//   }, [])

//   const handleFormData = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const textBox = form.textBox.value;

//     const data = { user_id: user.id, description: textBox };

//     axios
//       .post(`${import.meta.env.VITE_BASE_URL}/posts`, data)
//       .then((res) => {
//         // postSetData([...postData, data]);
//         setPostData(...postData, res.data)
//         console.log(res);
//       })
//       .catch((error) => console.log(error.message));
//   };

  return (
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
  );
};

export default PostForm;
