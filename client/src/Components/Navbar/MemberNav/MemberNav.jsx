import "./MemberNavStyles.css";
import React from "react";
import ursus from "../../../Assets/ursus_v6_1.png";
import searchIco from "../../../Assets/search_ico.svg";
import { useNavigate, useLocation } from "react-router-dom";
import PublicSearch from "../../Search/PublicSearch/PublicSearch";
import { useAppContext } from "../../../Context/appContext";
import accountIco from "../../../Assets/account_ico.svg";
import { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/Sidebar";

const MemberNav = ({ handleChange, searchTerm }) => {
  const [loginClick, setLoginClick] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const handleLogin = e => {
    e.preventDefault();
    setLoginClick(!loginClick);
    searchClick && setSearchClick(!searchClick);
  };
  const handleSearch = e => {
    e.preventDefault();
    setSearchClick(!searchClick);
    loginClick && setLoginClick(!loginClick);
  };

  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = e => {
    e.preventDefault();
    setSidebar(!sidebar);
  };

  return (
    <>
      <nav className="public-nav">
        <div className="nav-ico-logo member">
          <Sidebar />

          <img src={ursus} alt="" />
        </div>
        <div className="user-search-wrap">
          {searchClick && (
            <PublicSearch handleChange={handleChange} searchTerm={searchTerm} />
          )}

          <div
            onClick={handleSearch}
            className={searchClick ? "nav-ico-search active" : "nav-ico-search"}
          >
            <img src={searchIco} alt="" />
          </div>

          {/* <div className="nav-ico-user">
            <img src={homeIco} alt="" />
          </div> */}

          <div
            onClick={handleLogin}
            className={loginClick ? "nav-ico-user active" : "nav-ico-user"}
          >
            {loginClick && (
              // <div className="expand">
              <>
                <span className="expand active-hover">Profil</span>
                <span className="expand active-hover">Kijeletnkezés</span>
              </>
              // </div>
            )}
            <div className="user">
              <img src={accountIco} alt="" />
              <h3>User Name</h3>
            </div>
          </div>
        </div>
      </nav>
      {/* <NewPagination /> */}
    </>
  );
};

export default MemberNav;
