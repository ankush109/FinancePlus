import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const user = useSelector((state: any) => state.auth.user);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 p-5 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          FinacPlus
        </Link>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-5 w-full justify-end">
          {user ? (
            <>
              <div>Welcome {user?.name}</div>
              <Link href="/profile">My Profile</Link>
              <div onClick={handleLogout} className="cursor-pointer">
                Logout
              </div>
            </>
          ) : (
            <Link href="/login" className="cursor-pointer">
              Login
            </Link>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-3">
          {user ? (
            <>
              <div className="px-5">Hi,{user?.name}</div>
              <Link href="/profile" className="px-5">
                My Profile
              </Link>
              <div onClick={handleLogout} className="px-5 cursor-pointer">
                Logout
              </div>
            </>
          ) : (
            <Link href="/login" className="px-5 cursor-pointer">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
