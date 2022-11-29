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

  const handleChange = e => {
    setSearchTerm(e.target.value);
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

  // if (results.length === 0) {
  //   return (
  //     // <div className="no-recipe-found">
  //     <>
  //       <div className="recipe-container public">
  //         <h1>Nincs találat</h1>
  //       </div>
  //     </>
  //     // </div>
  //   );
  // }
  return (
    <>
      <div className="recipe-container public">
        <FetchAllSearch
          handleChange={handleChange}
          handleClearValues={handleClearValues}
          searchTerm={searchTerm}
          results={results.length}
        />
        {/* <h2 className="recipes-hero">Találat: {results.length} </h2> */}

        <Grid container justifyContent={"center"}>
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
