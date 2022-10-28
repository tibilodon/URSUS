import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const SharedLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default SharedLayout;
