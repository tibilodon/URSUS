import { useEffect } from "react";
import { useAppContext } from "../Context/appContext";
import Item from "./Item";

const FetchAll = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
  }, []);

  // const { title } = recipes;
  // console.log(allRecipes);
  return (
    <div style={{ marginTop: "5em" }}>
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
