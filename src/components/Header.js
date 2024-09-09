import React from "react";
import Logo from "./Logo";
import { HiSearch } from "react-icons/hi";
import { TiUser } from "react-icons/ti";
import { TiCoffee } from "react-icons/ti";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-sm bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
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
            <TiUser />
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
            <Link
              to={"/login"}
              className="px-3 py-1 rounded-full text-white bg-amber-900 hover:bg-amber-950 "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
