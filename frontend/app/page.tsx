"use client";

import { useEffect } from "react";
import { AppDispatch } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./store/slices/AuthSlice";
import Home from "./components/Home";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    if (token) {
      console.log("in here");
      dispatch(fetchUserDetails());
    }
  }, []);

  const user = useSelector((state: any) => state.auth.user);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>

      <Home />
    </>
  );
}
