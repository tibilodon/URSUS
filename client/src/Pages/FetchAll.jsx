import { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import Item from "./Item";
import TestNav from "./TestNav";

const FetchAll = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
  }, []);

  // const { title } = recipes;
  // console.log(allRecipes);
  return (
    <div>
      {/* <TestNav /> */}
      FetchAll {allRecipes.length}
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
