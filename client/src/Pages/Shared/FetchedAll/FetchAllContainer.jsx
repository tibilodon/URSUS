import "./FetchAllContainerStyles.css";
import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import FetchedItem from "../../../Components/Recipe/FetchedItem/FetchedItem";
import { Grid } from "@mui/material";
import FetchAllSearch from "../../../Components/Search/FetchAllSearch/FetchAllSearch";

const FetchAllContainer = () => {
  const { allRecipes, fetchAll, searchType, searchDifficulty } =
    useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  // const [recType, setRecType] = useState(searchType);
  // const [recDiff, setRecDiff] = useState(searchDifficulty);

  // const [nm, setNm] = useState();

  const handleChange = e => {
    if (e.target.name === "search") {
      setSearchTerm(e.target.value);
    }
    // if (e.target.name === "searchType") {
    //   setRecType(e.target.value);
    // }
    // if (e.target.name === "searchDifficulty") {
    //   setRecDiff(e.target.value);
    // }
    // console.log("NAME:", e.target.name, "VALUE:", e.target.value);
  };

  const handleClearValues = e => {
    e.preventDefault();
    setSearchTerm("");
  };

  const results = allRecipes.filter(item => {
    return item.title.includes(searchTerm);
  });

  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <>
      <div className="recipe-container public">
        <FetchAllSearch
          // recType={recType}
          // recDiff={recDiff}
          handleChange={handleChange}
          handleClearValues={handleClearValues}
          searchTerm={searchTerm}
        />
        <h2 className="recipes-hero">Összes Recept: {allRecipes.length} </h2>

        <Grid container justifyContent={"center"}>
          {/* {allRecipes
            .filter(recipe => {
              if (searchTerm === "" && searchTerm === "összes") {
                return recipe;
              }
              if (recipe.title.includes(searchTerm)) {
                return recipe;
              }
              if (searchTerm === "összes") {
                return recipe;
              }
              if (recipe.recipeType.includes(searchTerm)) {
                return recipe;
              }
              if (searchTerm === "összes") {
                return recipe;
              }
              if (recipe.difficulty.includes(searchTerm)) {
                return recipe;
              }
            }) */}
          {results &&
            results.map(recipe => {
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
