import "./AllRecipesContainerStyles.css";
import React from "react";
import AllRecipes from "../AllRecipes";
import Search from "../../../../Components/Search/Search";

const AllRecipesContainer = () => {
  return (
    <div>
      <Search />
      <AllRecipes />
    </div>
  );
};

export default AllRecipesContainer;
