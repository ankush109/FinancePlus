"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";
import { useRouter } from "next/navigation";
import LoaderComponent from "./LoaderComponent";

const Profile = () => {
  const { user, loading } = useSelector((state: any) => state.auth);
  const error = useSelector((state: any) => state.auth.error);
  const [countdown, setcountdown] = useState(5);
  const router = useRouter();
  console.log(error, "error");
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (error) {
      interval = setInterval(() => {
        setcountdown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        router.push("/login");
      }, 4000);
    }
    return () => clearInterval(interval);
  });
  if (error)
    return (
      <div className="text-red-500 m-10 text-3xl text-center">
        UnAuthorized ! Redirecting to Login {countdown}
      </div>
    );
  return (
    <>
      {" "}
      {!loading && user ? (
        <EditProfile userId={1} userData={user} />
      ) : (
        <LoaderComponent />
      )}
    </>
  );
};

export default Profile;
