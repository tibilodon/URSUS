import "./RecipeContainerStyles.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../RecipeItem";

import Loader from "../../Loader/Loader";
const RecipeContainer = () => {
  const {
    getRecipes,
    recipes,
    isLoading,
    page,
    totalRecipes,
    search,
    searchType,
    searchDifficulty,
    imgRef,
    imgURL,
    sort,
  } = useAppContext();

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, [
    search,
    searchType,
    searchDifficulty,
    sort,
    page,
    totalRecipes,
    imgRef,
    imgURL,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (recipes.length === 0) {
    return (
      <div className="no-recipe-found">
        <h1>Nincs találat</h1>
      </div>
    );
  }

  return (
    <>
      <div className="recipe-container">
        <Grid container justifyContent={"center"}>
          {recipes.map(recipe => {
            return (
              <div key={recipe._id} className="full">
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
