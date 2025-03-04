"use client";

import { useEffect } from "react";
import { AppDispatch } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "./store/slices/AuthSlice";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, error } = useSelector((state: any) => {
    console.log(state.auth);
    return state.auth;
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "token");
    if (token) {
      console.log("in here");
      dispatch(fetchUserDetails());
    } else {
      router.push("/login");
    }
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      router.push("/login");
    }
  }, [error]);
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}
