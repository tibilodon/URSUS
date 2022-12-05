import "./PaginationStyles.css";
import React from "react";
import leftArrow from "../../Assets/nav-left-ico.svg";
import rightArrow from "../../Assets/nav-right-ico.svg";

const NewPagination = () => {
  return (
    <>
      <div className="pagi-wrap">
        <button className="arrow-btn">
          <img src={leftArrow} alt="" />
        </button>

        <button className="arrow-btn pagi-number">1</button>
        <button className="arrow-btn pagi-number">1</button>
        <button className="arrow-btn">
          <img src={rightArrow} alt="" />
        </button>
      </div>
    </>
  );
};

export default NewPagination;
