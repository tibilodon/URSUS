import "./PaginationStyles.css";

import React from "react";
import { useAppContext } from "../../Context/appContext";
import leftArrow from "../../Assets/nav-left-ico.svg";
import rightArrow from "../../Assets/nav-right-ico.svg";

const MemberNewPagination = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = numOfPages;
      //you can jump to the first page with this option:
      //newPage=1
    }
    changePage(newPage);
  };
  return (
    <>
      <div className="pagi-wrap">
        <button type="button" onClick={prevPage} className="arrow-btn">
          <img src={leftArrow} alt="" />
        </button>
        {pages.map(pageNumber => {
          return (
            <button
              type="button"
              onClick={() => changePage(pageNumber)}
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

        <button type="button" onClick={nextPage} className="arrow-btn">
          <img src={rightArrow} alt="" />
        </button>
      </div>
    </>
  );
};

export default MemberNewPagination;
