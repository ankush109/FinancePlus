import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="bg-blue-500 p-5 text-white flex justify-between">
      <div>FinacPlus</div>
      <div className="flex gap-5">
        <div>Welcome {user.name}</div>
        <div>My Profile</div>
        <div>Logout</div>
      </div>
    </div>
  );
};

export default Navbar;
