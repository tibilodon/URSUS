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
import Card from "../../Card/Card";
import FetchAllContainer from "../../../Pages/Shared/FetchedAll/FetchAllContainer";
import collapseIco from "../../../Assets/collapse_ico.svg";

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
    fetchAll,
    allRecipes,
  } = useAppContext();

  const location = useLocation();
  const pathMatchRoute = route => {
    if (route === location.pathname) {
      return true;
    }
  };
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

  //for all-recipes
  const [searchTerm, setSearchTerm] = useState("");
  const results = allRecipes.filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleChangeSearch = e => {
    setSearchTerm(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  //get posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const prevPage = pageNumbers => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      // newPage = pageNumbers;
      newPage = 1;
    }
    setCurrentPage(newPage);
  };

  const nextPage = pageNumbers => {
    let newPage = currentPage + 1;

    if (newPage > pageNumbers) {
      newPage = pageNumbers;
      //you can jump to the first page with this option:
      // newPage = 1;
      // setCurrentPage(newPage);
    }
    setCurrentPage(newPage);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <nav className="public-nav">
        <div className="nav-ico-logo member">
          <Sidebar />

          <img onClick={() => navigate("/")} src={ursus} alt="" />
        </div>
        <div className="user-search-wrap mobile">
          {searchClick && (
            <PublicSearch
              collapse={handleSearch}
              // handleChange={handleChangeSearch}
              value={pathMatchRoute("/all-recipes") ? searchTerm : search}
              searchResults={
                pathMatchRoute("/all-recipes")
                  ? handleChangeSearch
                  : searchResults
              }
            />
          )}

          {!pathMatchRoute("/add-recipe") && (
            <div
              onClick={handleSearch}
              className={
                searchClick ? "nav-ico-search active" : "nav-ico-search"
              }
            >
              <img src={searchIco} alt="" />
            </div>
          )}

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
      {pathMatchRoute("/all-recipes") && (
        <FetchAllContainer
          results={results}
          currentPosts={currentPosts}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          //or allRecipes.length
          totalPosts={results.length}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </>
  );
};

export default MemberNav;
