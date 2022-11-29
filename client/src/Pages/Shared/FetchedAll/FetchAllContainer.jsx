import "./FetchAllContainerStyles.css";
import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import FetchedItem from "../../../Components/Recipe/FetchedItem/FetchedItem";
import { Grid } from "@mui/material";
import FetchAllSearch from "../../../Components/Search/FetchAllSearch/FetchAllSearch";
import PublicPagination from "../../../Components/Pagination/PublicPagination";

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

  return (
    <>
      <div className="all-recipes-wrap">
        <FetchAllSearch
          handleChange={handleChange}
          handleClearValues={handleClearValues}
          searchTerm={searchTerm}
          results={results.length}
        />

        <div className="pagination-align">{<PublicPagination />}</div>

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
