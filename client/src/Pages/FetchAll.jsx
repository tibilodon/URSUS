import { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import Item from "./Item";

const FetchAll = () => {
  const { recipes, fetchAll } = useAppContext();
  const { title } = recipes;
  console.log(recipes);
  return (
    <div>
      FetchAll
      {recipes.map(recipe => {
        return (
          <div key={recipe.createdAt}>
            <Item recipe={recipe} />
          </div>
        );
      })}
    </div>
  );
};

export default FetchAll;
