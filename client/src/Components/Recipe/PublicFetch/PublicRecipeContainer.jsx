import "./PublicRecipeContainerStyles.css";
import { useAppContext } from "../../../Context/appContext";
import { useEffect } from "react";
import FetchedItem from "../FetchedItem/FetchedItem";
import PublicNavbar from "../../Navbar/PublicNavbar/PublicNavbar";
import { Grid } from "@mui/material";

const PublicRecipeContainer = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <PublicNavbar />

      <div className="recipe-container public">
        <h2 className="recipes-hero">Összes Recept: {allRecipes.length} </h2>

        <Grid container justifyContent={"center"}>
          {allRecipes.map(recipe => {
            return (
              <div key={recipe.createdAt}>
                <Grid item xs={12} sx={{ margin: "2em" }}>
                  <FetchedItem recipe={recipe} />
                </Grid>
              </div>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default PublicRecipeContainer;
