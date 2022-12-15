import "./ButtonStyles.css";

import React from "react";

const BtnOne = ({ bgCol, text, img, btnType, onClick, disabled }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        type={btnType}
        className={`btnOne ${bgCol}`}
      >
        {text && text}
        {img && <img src={img} alt="" />}
      </button>
    </>
  );
};

export default BtnOne;
