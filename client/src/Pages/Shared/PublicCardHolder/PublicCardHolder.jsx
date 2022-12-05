import React from "react";
import BgWrap from "../../../Components/BgWrap";
import Card from "../../../Components/Card/Card";
import PublicNavTest from "../../../Components/Navbar/PublicNavbar/PublicNavTest";
import NewPagination from "../../../Components/Pagination/NewPagination";

const PublicCardHolder = () => {
  return (
    <>
      <PublicNavTest />
      <BgWrap>
        <NewPagination />
        <Card />
      </BgWrap>
    </>
  );
};

export default PublicCardHolder;
