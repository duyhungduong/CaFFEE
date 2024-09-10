import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";

import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log("data login", data);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto focus-within:shadow-md rounded-xl">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label htmlFor="">Email</label>
              <div className="bg-slate-200 p-4 rounded-full my-2">
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="enter your email..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="">Password</label>
              <div className="bg-slate-50 p-4 flex rounded-full my-2">
                <input
                  type={showPassword ? "" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="enter your password..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  {/* <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span> */}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="my-1.5 block w-fit ml-auto hover:underline hover:text-amber-900"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-amber-900 text-white hover:bg-amber-950 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-4">
              Login
            </button>
          </form>
          <p className="my-4">
            Don't have account ?{" "}
            <Link
              to={"/Sign-up"}
              className="text-amber-900 hover:text-amber-950 hover:underline "
            >
              Sign-up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
