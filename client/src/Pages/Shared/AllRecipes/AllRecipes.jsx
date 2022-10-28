import "./AllRecipesStyles.css";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../../../Components/Recipe/RecipeItem";

const AllRecipes = () => {
  const { recipes, getRecipes } = useAppContext();
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <>
      <Grid container justifyContent="space-between">
        {recipes.map(recipe => {
          return <RecipeItem key={recipe._id} {...recipe} />;
        })}
      </Grid>
    </>
  );
};

export default AllRecipes;
