import "./PublicRecipeContainerStyles.css";
import { useAppContext } from "../../../Context/appContext";
import { useEffect } from "react";
import FetchedItem from "../FetchedItem/FetchedItem";
import PublicNavbar from "../../Navbar/PublicNavbar/PublicNavbar";

const PublicRecipeContainer = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <PublicNavbar />
      <div style={{ marginTop: "5em" }}>
        {/* <TestNav /> */}
        FetchAll {allRecipes.length}
        {allRecipes.map(recipe => {
          return (
            <div key={recipe.createdAt}>
              <FetchedItem recipe={recipe} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PublicRecipeContainer;
