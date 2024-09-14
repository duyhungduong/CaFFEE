import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdOutlineModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../components/changeUserRole";

const AllUser = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    role: "",
    _id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponce = await fetchData.json();

    if (dataResponce.success) {
      setAllUsers(dataResponce.data);
    }

    if (dataResponce.error) {
      toast.error(dataResponce.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white pb-3">
      <table className="w-full userTable">
        <thead className="bg-black text-white">
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
        </thead>
        <tbody className="">
          {allUser.map((el, index) => {
            return (
              <tr>
                <td className="text-center">{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.phone}</td>
                <td>{el?.address}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("lll")}</td>
                <td className="text-center">
                  <button
                    className="bg-[#4bac4d] rounded-full cursor-pointer p-2 hover:bg-[#4bac4dc5] focus-within:shadow-md m-1 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdOutlineModeEditOutline />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          phone={updateUserDetails.phone}
          address={updateUserDetails.address}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUser;
