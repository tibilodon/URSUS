import "./FetchAllContainerStyles.css";
import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import FetchedItem from "../../../Components/Recipe/FetchedItem/FetchedItem";
import { Grid } from "@mui/material";
import FetchAllSearch from "../../../Components/Search/FetchAllSearch/FetchAllSearch";
import PublicPagination from "../../../Components/Pagination/PublicPagination";

const FetchAllContainer = () => {
  const { allRecipes, fetchAll } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleClearValues = e => {
    e.preventDefault();
    setSearchTerm("");
  };

  const results = allRecipes.filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  //get posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const prevPage = pageNumbers => {
    let newPage = currentPage - 1;
    if (newPage < 1) {
      // newPage = pageNumbers;
      newPage = 1;
    }
    setCurrentPage(newPage);
  };

  const nextPage = pageNumbers => {
    let newPage = currentPage + 1;
    // console.log("NEWPAGE", newPage);

    if (newPage > pageNumbers) {
      newPage = pageNumbers;
      //you can jump to the first page with this option:
      // newPage = 1;
      // setCurrentPage(newPage);
    }
    setCurrentPage(newPage);
  };

  // console.log("CURRENTPAGE", currentPage);

  return (
    <>
      <div className="all-recipes-wrap">
        <FetchAllSearch
          handleChange={handleChange}
          handleClearValues={handleClearValues}
          searchTerm={searchTerm}
          results={results.length}
        />

        <div className="pagination-align">
          {
            <PublicPagination
              page={currentPage}
              postsPerPage={postsPerPage}
              //or allRecipes.length
              totalPosts={results.length}
              paginate={paginate}
              prevPage={prevPage}
              nextPage={nextPage}
            />
          }
        </div>

        <Grid container justifyContent={"center"}>
          {results &&
            currentPosts.map(recipe => {
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
