import React from "react";
import "./PublicNavbarStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import noAccountIco from "../../../Assets/no_account_ico.svg";
import searchIco from "../../../Assets/search_ico.svg";

const PublicNavTest = () => {
  return (
    <>
      <nav className="public-nav">
        <div className="nav-ico-logo">
          <img src={ursus} alt="" />
        </div>
        <div className="user-search-wrap">
          <div className="nav-ico-search">
            <img src={searchIco} alt="" />
          </div>
          <div className="nav-ico-user">
            <img src={noAccountIco} alt="" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavTest;
