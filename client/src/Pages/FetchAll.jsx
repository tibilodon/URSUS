import { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import Item from "./Item";

const FetchAll = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
  }, []);
  // const { title } = recipes;
  console.log(allRecipes);
  return (
    <div>
      FetchAll
      {allRecipes.map(recipe => {
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
