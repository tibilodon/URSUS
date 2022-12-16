import "./FetchAllContainerStyles.css";
import React from "react";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import FetchedItem from "../../../Components/Recipe/FetchedItem/FetchedItem";
import { Grid } from "@mui/material";
import FetchAllSearch from "../../../Components/Search/FetchAllSearch/FetchAllSearch";
import PublicPagination from "../../../Components/Pagination/PublicPagination";
import Card from "../../../Components/Card/Card";
import BgWrap from "../../../Components/BgWrap";
import NewPagination from "../../../Components/Pagination/NewPagination";

const FetchAllContainer = ({
  results,
  currentPosts,
  postsPerPage,
  paginate,
  prevPage,
  nextPage,
  currentPage,
  totalPosts,
}) => {
  const { fetchAll } = useAppContext();
  // const [searchTerm, setSearchTerm] = useState("");

  // const handleChange = e => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleClearValues = e => {
  //   e.preventDefault();
  //   setSearchTerm("");
  // };

  // const results = allRecipes.filter(item => {
  //   return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  //get posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  // const paginate = pageNumber => setCurrentPage(pageNumber);

  // const prevPage = pageNumbers => {
  //   let newPage = currentPage - 1;
  //   if (newPage < 1) {
  //     // newPage = pageNumbers;
  //     newPage = 1;
  //   }
  //   setCurrentPage(newPage);
  // };

  // const nextPage = pageNumbers => {
  //   let newPage = currentPage + 1;

  //   if (newPage > pageNumbers) {
  //     newPage = pageNumbers;
  //     //you can jump to the first page with this option:
  //     // newPage = 1;
  //     // setCurrentPage(newPage);
  //   }
  //   setCurrentPage(newPage);
  // };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <BgWrap>
        <div className={totalPosts === 1 ? "full" : null}>
          {results &&
            currentPosts.map(recipe => {
              return (
                <div className={"keksz"} key={recipe.createdAt}>
                  <Card {...recipe} recipe={recipe} />
                </div>
              );
            })}
          {totalPosts >= 1 ? (
            <div onClick={() => window.scrollTo(0, 0)}>
              <NewPagination
                page={currentPage}
                postsPerPage={postsPerPage}
                //or allRecipes.length
                totalPosts={totalPosts}
                paginate={paginate}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </div>
          ) : null}
        </div>
      </BgWrap>
    </>
  );
};

export default FetchAllContainer;
