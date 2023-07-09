import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loggedUser, user } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);

    const response = loggedUser(data)
    console.log(response)
  };

  console.log(user);

  return (
    <div>
      <div>
        <div className="py-40 min-h-screen relative">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl shadow-2xl rounded-xl mx-auto bg-gradient-to-br from-sky-100 to-white"
          >
            <div className="card-body">
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
                <input className="btn-primary" type="submit" value="Login" />
              </div>
              {/* <p className="text-sm text-red-600 max-w-sm mb-2">{error}</p> */}
              <div className="label-text-alt">
                <p className="inline-block mr-2">Don't have an account?</p>
                <Link to="/sign-up" className="text-sky-500">
                  Signup
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
