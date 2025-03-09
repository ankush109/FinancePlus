"use client";

import ResetPassword from "@/app/components/ResetPassword";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params: any = useParams();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <ResetPassword token={params.token} />
    </div>
  );
};

export default page;
