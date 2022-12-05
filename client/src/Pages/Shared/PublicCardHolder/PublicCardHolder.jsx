import "./PublicCardHolderStyles.css";

import React from "react";
import BgWrap from "../../../Components/BgWrap";
import Card from "../../../Components/Card/Card";
import PublicNavTest from "../../../Components/Navbar/PublicNavbar/PublicNavTest";
import NewPagination from "../../../Components/Pagination/NewPagination";
import bgImg from "../../../Assets/bg-img.jpg";

const PublicCardHolder = () => {
  return (
    <>
      <PublicNavTest />
      <BgWrap>
        <NewPagination />
        <div className="card-holder-card-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </BgWrap>
    </>
  );
};

export default PublicCardHolder;
