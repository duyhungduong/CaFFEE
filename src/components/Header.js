import React from "react";
import Logo from "./Logo";
import { HiSearch } from "react-icons/hi";
import { TiUser } from "react-icons/ti";
import { TiCoffee } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user); // Them "? " neu ko co san user thi se thanh loi~
  const dispatch = useDispatch();

  console.log("user header", user);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const dataApi = await fetchData.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      //window.location.reload();
      dispatch(setUserDetails(null));
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  return (
    <header className="h-16 shadow-sm bg-white">
      <div className="h-full container mx-auto px-3 flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="search..."
            className="w-full outline-none "
          />
          <div className="text-lg min-w-[50px] h-8 bg-amber-900 flex items-center justify-center rounded-r-full text-white">
            <HiSearch />
          </div>
        </div>

        <div className="flex items-center gap-6 ">
          <div className="text-3xl cursor-pointer">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <TiUser />
            )}
          </div>
          <div className="text-3xl cursor-pointer relative">
            <span>
              <TiCoffee />
            </span>
            <div className="bg-amber-900 text-white w-4 h-4 flex rounded-full p-1 items-center justify-center absolute -top-2 -right-3">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-2 py-2 rounded-full text-white bg-amber-900 hover:bg-amber-950 "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-2 py-2 rounded-full text-white bg-amber-900 hover:bg-amber-950 "
              >
                Sign in
              </Link>
            )}
          </div>
          <div>
            {user?._id ? (
              <button className="hidden"></button>
            ) : (
              <Link
                to={"/sign-up"}
                className="hidden lg:flex px-2 py-2 rounded-full text-white bg-amber-900 hover:bg-amber-950 "
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
