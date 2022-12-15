import "./ButtonStyles.css";

import React from "react";

const BtnOne = ({ bgCol, text, img }) => {
  return (
    <>
      <button type="button" className={`btnOne ${bgCol}`}>
        {text && text}
        {img && <img src={img} alt="" />}
      </button>
    </>
  );
};

export default BtnOne;
