import "./FetchAllContainerStyles.css";
import React from "react";
import { useEffect } from "react";
import { useAppContext } from "../../../Context/appContext";
import Card from "../../../Components/Card/Card";
import BgWrap from "../../../Components/BgWrap";
import NewPagination from "../../../Components/Pagination/NewPagination";
import SearchNot from "../../../Components/Alert/SearchNot";

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

  useEffect(() => {
    fetchAll();
  }, []);

  if (totalPosts < 1) {
    return (
      <BgWrap>
        <SearchNot />
      </BgWrap>
    );
  }

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
