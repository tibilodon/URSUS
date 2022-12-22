import React from "react";
import { Outlet } from "react-router-dom";
import MemberNav from "../../Components/Navbar/MemberNav/MemberNav";

const SharedLayout = () => {
  return (
    <>
      <MemberNav />
      <Outlet />
    </>
  );
};

export default SharedLayout;
