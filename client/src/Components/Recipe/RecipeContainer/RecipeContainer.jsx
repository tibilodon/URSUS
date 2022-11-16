import "./RecipeContainerStyles.css";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../RecipeItem";
import Pagination from "../../Pagination/Pagination";
const RecipeContainer = () => {
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
    searchType,
    searchDifficulty,
    // recipeType,
    // difficulty,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getRecipes();
    // console.log(recipes.length);
    // console.log("SEARCH", search);
  }, [search, searchType, searchDifficulty, sort, page]);

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
        {numOfPages > 1 && <Pagination />}
        {recipes.map(recipe => {
          return <RecipeItem key={recipe._id} {...recipe} />;
        })}
      </Grid>
    </>
  );
};

export default RecipeContainer;
