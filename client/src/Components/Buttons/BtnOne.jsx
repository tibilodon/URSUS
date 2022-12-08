import "./ButtonStyles.css";

import React from "react";

const BtnOne = ({ bgCol, text }) => {

  return (
    <>
      <button


        className={`btnOne ${bgCol}`}
      >
        {text}
      </button>
    </>
  );
};

export default BtnOne;
