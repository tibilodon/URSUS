import { useState, useEffect } from "react";
import "./PublicNavbarStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import noAccountIco from "../../../Assets/no_account_ico.svg";
import searchIco from "../../../Assets/search_ico.svg";
import { useNavigate, useLocation } from "react-router-dom";
import PublicSearch from "../../Search/PublicSearch/PublicSearch";
import NewPagination from "../../Pagination/NewPagination";
import homeIco from "../../../Assets/home-ico.svg";
import { useAppContext } from "../../../Context/appContext";
import collapseIco from "../../../Assets/collapse_ico.svg";

const PublicNavTest = ({ handleChange, searchTerm }) => {
  const { allRecipes, fetchAll } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAll();
  }, []);

  //search will not be available @auth pages
  const pathMatchRoute = route => {
    if (route === location.pathname) {
      return true;
    }
  };
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
  return (
    <>
      <nav className="public-nav">
        <div className="nav-ico-logo">
          <img onClick={() => navigate("/landing")} src={ursus} alt="" />
        </div>
        <div className="user-search-wrap">
          {searchClick && (
            <PublicSearch
              collapse={handleSearch}
              handleChange={handleChange}
              searchTerm={searchTerm}
            />
          )}
          {pathMatchRoute("/register") || pathMatchRoute("/login") ? null : (
            <div
              onClick={handleSearch}
              className={
                searchClick ? "nav-ico-search active mobile" : "nav-ico-search"
              }
            >
              <img src={searchIco} alt="" />
            </div>
          )}
          {pathMatchRoute("/register") || pathMatchRoute("/login") ? (
            <div onClick={() => navigate("/")} className="nav-ico-user">
              <img src={homeIco} alt="" />
            </div>
          ) : (
            <div
              onClick={handleLogin}
              className={
                loginClick ? "nav-ico-user active mobile-user" : "nav-ico-user"
              }
            >
              {loginClick && (
                <>
                  <img className="mobileIco-user" src={collapseIco} alt="" />
                  <div className="mobile-user-spans">
                    <span
                      onClick={() => navigate("/login")}
                      className="expand active-hover"
                    >
                      Belépés
                    </span>
                    <span
                      onClick={() => navigate("/register")}
                      className="expand active-hover"
                    >
                      Regisztráció
                    </span>
                  </div>
                </>
              )}
              <img src={noAccountIco} alt="" />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default PublicNavTest;
