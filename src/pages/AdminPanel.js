import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TiUser } from "react-icons/ti";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { FaUsers, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";
import { FaTablets } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";


const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);// Them "? " neu ko co san user thi se thanh loi~
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(()=> {
    if(user?.role !== ROLE.ADMIN){
      navigate('/')
    }
  },[user])
  
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
    <div className="min-h-[calc(100vh-130px)] md:flex hidden">
      {/* Sidebar */}
      <aside className="bg-coffee-beige min-h-full w-full max-w-xs customShadow">
        {/* User Info */}
        <div className="h-36 flex justify-center items-center bg-coffee-brown text-white">
          <div className="text-7xl relative flex justify-center flex-col items-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            ) : (
              <TiUser />
            )}
            <p className="text-lg m-1 capitalize bg-coffee-dark text-white p-1 rounded-md">{user?.name}</p>
            <p className="text-sm italic text-coffee-beige">{user?.role}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-4">
          <nav className="grid gap-4">
            <Link to="all-users" className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark">
              <FaUsers className="text-xl" /> Users
            </Link>
            <Link to="all-products" className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark">
              <FaBoxOpen className="text-xl" /> Products
            </Link>
            <Link to="all-tables" className="flex items-center gap-2 px-4 py-3 hover:bg-coffee-green text-coffee-dark">
            <FaTablets className="text-xl" /> Tables
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto mb-4 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-coffee-brown text-white hover:bg-coffee-dark rounded-md"
          >
            <FaSignOutAlt className="text-xl" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full h-full p-4 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
