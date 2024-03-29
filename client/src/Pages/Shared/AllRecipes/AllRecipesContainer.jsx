import "./AllRecipesContainerStyles.css";
import React from "react";
import RecipeContainer from "../../../Components/Recipe/RecipeContainer/RecipeContainer";
import Pagination from "../../../Components/Pagination/Pagination";
import { useAppContext } from "../../../Context/appContext";

const AllRecipesContainer = () => {
  const { numOfPages } = useAppContext();
  return (
    <div className="all-recipes-wrap full">
      {/* <Search /> */}
      {numOfPages > 1 && (
        <div className="pagination-align">
          <Pagination />
        </div>
      )}
      <RecipeContainer />
      {numOfPages > 1 && (
        <div className="pagination-align">
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default AllRecipesContainer;
