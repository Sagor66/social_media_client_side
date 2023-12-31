
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, user } = useContext(AuthContext)

  const onSubmit = (data) => {
    console.log(data);

    const response = createUser(data)
    console.log(response)
    
  };

//   console.log(user)

  return (
    <div>
      <div className="py-40 min-h-screen relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-xl shadow-2xl rounded-xl mx-auto bg-gradient-to-br from-sky-100 to-white"
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />
              </div>
            </div>
            <div className="form-control my-8">
              <input className="btn-primary" type="submit" value="Sign Up" />
            </div>
            <div className="label-text-alt">
              <p className="inline-block mr-2">Already have an account?</p>
              <Link to="/login" className="text-sky-500">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
