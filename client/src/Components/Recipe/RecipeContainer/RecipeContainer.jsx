import "./RecipeContainerStyles.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../RecipeItem";
import Pagination from "../../Pagination/Pagination";
import RecipeModal from "../../Modal/RecipeModal";

const RecipeContainer = () => {
  // const [moreData, setMoreData] = useState();

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
  }, [search, searchType, searchDifficulty, sort, page]);

  if (isLoading) {
    return <h1>ISLOADING</h1>;
  }

  if (recipes.length === 0) {
    return <h1>NO RECIPES TO BE DISPLAYED</h1>;
  }

  return (
    <>
      <div className="recipe-container">
        <h2 className="recipes-hero">Saját receptjeim: {totalRecipes} </h2>

        <Grid container justifyContent={"center"}>
          {recipes.map(recipe => {
            return (
              <div key={recipe._id}>
                <Grid item xs={12} sx={{ margin: "2em" }}>
                  <RecipeItem key={recipe._id} {...recipe} />
                </Grid>
              </div>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default RecipeContainer;
