"use client";
import Navbar from "@/app/components/Navbar";
import ResetPassword from "@/app/components/ResetPassword";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params: any = useParams();
  return (
    <>
      <Navbar />
      <ResetPassword token={params.token} />
    </>
  );
};

export default page;
