import "./FetchAllContainerStyles.css";
import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";
import FetchedItem from "../../../Components/Recipe/FetchedItem/FetchedItem";
import { Grid } from "@mui/material";

const FetchAllContainer = () => {
  const { allRecipes, fetchAll } = useAppContext();
  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);
  return (
    <>
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

export default FetchAllContainer;
