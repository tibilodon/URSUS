import "./AllRecipesContainerStyles.css";
import React from "react";
import Search from "../../../Components/Search/Search";
import RecipeContainer from "../../../Components/Recipe/RecipeContainer/RecipeContainer";
import Pagination from "../../../Components/Pagination/Pagination";

const AllRecipesContainer = () => {
  return (
    <div className="all-recipes-wrap">
      <Search />
      <RecipeContainer />
      <div className="pagination-bottom">
        <Pagination />
      </div>
    </div>
  );
};

export default AllRecipesContainer;
