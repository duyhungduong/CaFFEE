import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { TiUser } from "react-icons/ti";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()

  useEffect(()=> {
    if(user?.role !== ROLE.ADMIN){
      navigate('/')
    }
  },[user])
  return (
    <div className="min-h-[calc(100vh-130px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-36 flex justify-center items-center bg-red-300">
          <div className="text-7xl cursor-pointer relative flex justify-center flex-col items-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full "
              />
            ) : (
              <TiUser />
            )}
            <p className="text-lg m-1 capitalize bg-yellow-50">{user?.name}</p>
            <p className="text-sm italic">{user?.role}</p>
          </div>
        </div>
        <div>
          <nav className="grid">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100 ">
              All user
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              Product
            </Link>
            <Link to={"all-tables"} className="px-2 py-1 hover:bg-slate-100">
              Table
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
