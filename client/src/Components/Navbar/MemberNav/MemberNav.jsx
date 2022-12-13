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

const MemberNav = () => {
  const {
    isLoading,
    search,
    searchDifficulty,
    searchType,
    sort,
    sortOptions,
    difficultyOptions,
    recipeTypeOptions,
    totalRecipes,
    handleChange,
    clearFilters,
    numOfPages,
    user,
    logoutUser,
  } = useAppContext();
  const navigate = useNavigate();

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
  const searchResults = e => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <>
      <nav className="public-nav">
        <div className="nav-ico-logo member">
          <Sidebar />

          <img onClick={() => navigate("/")} src={ursus} alt="" />
        </div>
        <div className="user-search-wrap">
          {searchClick && (
            <PublicSearch
              // handleChange={handleSearch}
              value={search}
              searchResults={searchResults}
            />
          )}

          <div
            onClick={handleSearch}
            className={searchClick ? "nav-ico-search active" : "nav-ico-search"}
          >
            <img src={searchIco} alt="" />
          </div>

          <div
            onClick={handleLogin}
            className={loginClick ? "nav-ico-user active" : "nav-ico-user"}
          >
            {loginClick && (
              // <div className="expand">
              <>
                <span
                  onClick={() => navigate("/profile")}
                  className="expand active-hover"
                >
                  Profil
                </span>
                <span onClick={logoutUser} className="expand active-hover">
                  Kijeletnkezés
                </span>
              </>
              // </div>
            )}
            <div className="users">
              <img className="users-ico" src={accountIco} alt="" />
              <h3>{user && user.name}</h3>
            </div>
          </div>
        </div>
      </nav>
      {/* <NewPagination /> */}
    </>
  );
};

export default MemberNav;
