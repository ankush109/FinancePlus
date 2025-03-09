"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const EditProfile = lazy(() => import("./EditProfile"));
const LoaderComponent = lazy(() => import("./LoaderComponent"));

const Profile = () => {
  const { user, loading, error } = useSelector((state: any) => state.auth);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);

      const timeout = setTimeout(() => {
        router.push("/login");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [error, router]);

  if (error) {
    return (
      <div className="text-red-500 m-10 text-3xl text-center">
        Unauthorized! Redirecting to Login in {countdown}...
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {!loading && user ? (
        <EditProfile userId={user.id} userData={user} />
      ) : (
        <LoaderComponent />
      )}
    </Suspense>
  );
};

export default Profile;
