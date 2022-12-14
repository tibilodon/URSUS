import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import MemberNav from "../../Components/Navbar/MemberNav/MemberNav";
import PublicNavTest from "../../Components/Navbar/PublicNavbar/PublicNavTest";

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
