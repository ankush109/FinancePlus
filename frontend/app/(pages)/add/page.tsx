"use client";
import React from "react";
import { AddUserForm } from "../../components/AddUser";
import Navbar from "../../components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />

      <AddUserForm />
    </>
  );
};

export default page;
