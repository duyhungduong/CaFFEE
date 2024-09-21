import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { TiUser } from "react-icons/ti";
import { TiCoffee } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import caffee from "../assest/logocaffee.png";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user); // Them "? " neu ko co san user thi se thanh loi~
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

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
    <header className="h-20 shadow-sm bg-[#f6f4f3] fixed w-full z-20">
      <div className="h-full container mx-auto px-3 flex items-center justify-between">
        <div>
          <Link to={"/"}>
            {/*           
            <Logo w={90} h={50} /> */}
            <img
              src={caffee}
              alt=""
              className="w-auto h-auto max-w-[150px] max-h-[60px] object-contain"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            placeholder="search..."
            className="w-full outline-none bg-[#f6f4f3]"
          />
          <div className="text-lg min-w-[50px] h-8 bg-amber-900 flex items-center justify-center rounded-r-full text-white hover:scale-105 transition-all ">
            <HiSearch />
          </div>
        </div>

        <div className="flex items-center gap-6 ">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
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
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded-lg">
                <nav className="grid">
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:text-amber-600 bg-slate-50 p-3 rounded-md "
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}

                  {user?._id ? (
                    <Link
                      className="whitespace-nowrap hover:text-amber-600 bg-slate-50 p-3 rounded-md "
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Link>
                  ) : (
                    <button className="hidden"></button>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="text-3xl cursor-pointer relative ">
            <span className="">
              <TiCoffee />
            </span>
            <div className="bg-amber-900 text-white w-4 h-4 flex rounded-full p-1 items-center justify-center absolute -top-2 -right-3">
              <p className="text-xs">0</p>
            </div>
          </div>
          <div>
            {!user?._id && (
              <Link
                to={"/login"}
                className="px-2 py-2 rounded-full text-white bg-[#4bac4d] hover:bg-[#4bac4dc5] hover:scale-105 transition-all"
              >
                Đăng nhập
              </Link>
            )}
          </div>
          <div>
            {!user?._id && (
              <div>
                <Link
                  to={"/sign-up"}
                  className="hidden lg:flex px-2 py-2 rounded-full text-white bg-amber-900 hover:bg-amber-950 hover:scale-105 transition-all btnColor addBtnColor"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
