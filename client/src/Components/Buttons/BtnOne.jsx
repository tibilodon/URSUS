import "./ButtonStyles.css";

import React from "react";

const BtnOne = ({ bgCol, text, img, btnType, onClick, disabled }) => {
  return (
    <>
      <div className="btn-one-wrap">
        <button
          disabled={disabled}
          onClick={onClick}
          type={btnType || "button"}
          className={`btnOne ${bgCol}`}
        >
          {text && text}
          {img && <img src={img} alt="" />}
        </button>
      </div>
    </>
  );
};

export default BtnOne;
