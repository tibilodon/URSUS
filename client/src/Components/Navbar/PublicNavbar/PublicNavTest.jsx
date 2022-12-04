import { useState } from "react";
import "./PublicNavbarStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import noAccountIco from "../../../Assets/no_account_ico.svg";
import searchIco from "../../../Assets/search_ico.svg";
import { useNavigate } from "react-router-dom";
import PublicSearch from "../../Search/PublicSearch/PublicSearch";
import Register from "../../../Pages/Auth/Register/Register";

const PublicNavTest = () => {
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
  return (
    <>
      <nav className="public-nav">
        <div className="nav-ico-logo">
          <img src={ursus} alt="" />
        </div>
        <div className="user-search-wrap">
          {searchClick && <PublicSearch />}

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
                  onClick={() => navigate("/")}
                  className="expand active-hover"
                >
                  Belépés
                </span>
                <span className="expand active-hover">Regisztráció</span>
              </>
              // </div>
            )}
            <img src={noAccountIco} alt="" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default PublicNavTest;
