import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";
import Item from "../../../Components/Recipe/FetchedItem/FetchedItem";

const FetchAllContainer = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
  }, []);

  // const { title } = recipes;

  // console.log(allRecipes);
  return (
    <div className="all-recipes-wrap">
      <h2>{allRecipes.length} recept található</h2>

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

export default FetchAllContainer;
