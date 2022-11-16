import React from "react";

const Item = ({ recipe }) => {
  // const filterDiff = recipeType => {
  //   return recipeType === "leves";
  // };
  // const result = recipe.recipeType.filter(filterDiff);
  console.log(recipe.recipeType);

  return <div>{recipe.title}</div>;
};

export default Item;
