import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="bg-blue-500 p-5 text-white flex justify-between">
      <div>FinacPlus</div>
      <div className="flex gap-5">
        {user ? (
          <div>Welcome {user?.name}</div>
        ) : (
          <Link href="/login" className="cursor-pointer">
            Login
          </Link>
        )}

        {user ? (
          <div onClick={handleLogout} className="cursor-pointer">
            Logout
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Navbar;
