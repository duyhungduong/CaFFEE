import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import homeImg from "../assest/home-img-3.png";
import { Link, useNavigate } from "react-router-dom";
import bookBg from "../assest/book-bg.jpg";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const generalContext = useContext(Context);
  const {
    fetchUserDetails,
    fetchUserAddToCart,
    fetchUserAddToFavorite,
    fetchUserOrderProduct,
    fetchUserMessage,
    fetchUserBookingProduct,
  } = useContext(Context);

  console.log("generalContext", generalContext.fetchUserDetails());

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);

      navigate("/");
      fetchUserDetails(); // Thong tin tai khoan
      fetchUserAddToCart(); // Thong tin gio hang
      fetchUserAddToFavorite(); //Thong tin trang san pham yeu thich
      fetchUserOrderProduct(); // Thong tin don hang
      fetchUserMessage(); // Thong tin tin nhắn
      fetchUserBookingProduct();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log("data login", data);
  return (
    <section
      id="login"
      style={{
        backgroundImage: `url(${bookBg})`, // Use the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="mx-auto container p-4 flex items-center justify-center h-full">
        <div className="hidden lg:flex w-1/2 ">
          <img src={homeImg} alt="Coffee Cup" className="w-full h-auto" />
        </div>
        <div className="bg-white p-5 w-full max-w-sm mx-5 focus-within:shadow-md rounded-sm">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              {/* <label htmlFor="">Email</label> */}
              <div className="bg-[#d1c8c1] p-4 rounded-sm my-2">
                <input
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="EMAIL..."
                  className="w-full h-full outline-none bg-transparent font-montserrat"
                />
              </div>
            </div>
            <div className="grid">
              {/* <label htmlFor="">Password</label> */}
              <div className="bg-[#d1c8c1] p-4 flex rounded-md my-2">
                <input
                  type={showPassword ? "" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="PASSWORD..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="my-1.5 block w-fit ml-auto hover:underline hover:text-amber-900"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-amber-900 text-white hover:bg-amber-950 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-4 updateBtnColor">
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
