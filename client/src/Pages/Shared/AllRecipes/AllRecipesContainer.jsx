import "./AllRecipesContainerStyles.css";
import React from "react";
import Search from "../../../Components/Search/Search";
import RecipeContainer from "../../../Components/Recipe/RecipeContainer/RecipeContainer";

const AllRecipesContainer = () => {
  return (
    <div className="all-recipes-wrap">
      <Search />
      <RecipeContainer />
    </div>
  );
};

export default AllRecipesContainer;
