"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";

const Profile = () => {
  const { user, loading } = useSelector((state: any) => state.auth);

  return (
    <>
      {" "}
      {!loading && user ? (
        <EditProfile userId={1} userData={user} />
      ) : (
        "loading"
      )}
    </>
  );
};

export default Profile;
