"use client";

import { useEffect } from "react";
import { AppDispatch } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, loginSuccess } from "./store/slices/AuthSlice";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    if (token) {
      console.log("in here");
      dispatch(fetchUserDetails()); // ✅ Set token before checking user state
    }
  }, []); // ✅ Add dispatch as a dependency

  const user = useSelector((state: any) => state.auth.user);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
    </>
  );
}
