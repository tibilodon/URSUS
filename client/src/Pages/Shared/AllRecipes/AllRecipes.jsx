import "./AllRecipesStyles.css";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../../../Components/Recipe/RecipeItem";
import Pagination from "../../../Components/Pagination/Pagination";

const AllRecipes = () => {
  const {
    //recipes
    getRecipes,
    recipes,
    //loading
    isLoading,
    //search
    page,
    totalRecipes,
    search,
    searchDifficulty,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();
  useEffect(() => {
    getRecipes();
  }, [search, searchDifficulty, searchType, sort, page]);

  if (isLoading) {
    return <h1>ISLOADING</h1>;
  }

  if (recipes.length === 0) {
    return <h1>NO RECIPES TO BE DISPLAYED</h1>;
  }

  return (
    <>
      <Grid container justifyContent="space-between">
        <h2>{totalRecipes} recept található</h2>
        {recipes.map(recipe => {
          return <RecipeItem key={recipe._id} {...recipe} />;
        })}
      </Grid>
      {numOfPages > 1 && <Pagination />}
    </>
  );
};

export default AllRecipes;
