import "./PaginationStyles.css";
import React from "react";
import leftArrow from "../../Assets/nav-left-ico.svg";
import rightArrow from "../../Assets/nav-right-ico.svg";

const NewPagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  page,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="pagi-wrap">
        <button
          type="button"
          onClick={() => prevPage(pageNumbers.length)}
          className="arrow-btn"
        >
          <img src={leftArrow} alt="" />
        </button>
        {pageNumbers.map(pageNumber => {
          return (
            <button
              type="button"
              onClick={() => paginate(pageNumber)}
              key={pageNumber}
              className={
                pageNumber === page
                  ? "arrow-btn pagi-number actives"
                  : "arrow-btn pagi-number"
              }
            >
              {pageNumber}
            </button>
          );
        })}
        {/* <button className="arrow-btn pagi-number">1</button>
        <button className="arrow-btn pagi-number">1</button> */}
        <button
          type="button"
          onClick={() => nextPage(pageNumbers.length)}
          className="arrow-btn"
        >
          <img src={rightArrow} alt="" />
        </button>
      </div>
    </>
  );
};

export default NewPagination;
