import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <h1>Shared Layout</h1>
      <Outlet />
    </>
  );
};

export default SharedLayout;
