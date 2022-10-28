import "./AllRecipesStyles.css";

import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";

const AllRecipes = () => {
  const { title, recipeType, recipes } = useAppContext();
  return (
    <div className="test-wrapper">
      AllRecipes
      <h1>place</h1>
      {recipes.map(recipe => {
        return (
          <div key={recipe._id}>
            <h1>{recipe.title}</h1>
            <h1>{recipe.recipeType}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default AllRecipes;
