import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MemberNav from "../../Components/Navbar/MemberNav/MemberNav";

const SharedLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <MemberNav />
      <Outlet />
    </>
  );
};

export default SharedLayout;
