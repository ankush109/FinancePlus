"use client";
import React from "react";
import { EditUserForm } from "../../../components/EditUser";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useGetUserByIdQuery } from "@/app/hooks/query/useUserByIdQuery";

function page() {
  const params: any = useParams();
  const { data, isLoading } = useGetUserByIdQuery(params.id);
  return (
    <div className="">
      <Navbar />
      {!isLoading ? (
        <EditUserForm userId={params.id} userData={data.data} />
      ) : (
        <>Loading..</>
      )}
    </div>
  );
}

export default page;
