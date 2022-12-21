import React from "react";
import bg from "../../Assets/not-found-bg_50.jpg";
import BgWrap from "../BgWrap";

const SearchNot = () => {
  return (
    // <BgWrap>
    <div className="not-found mobile-not-found">
      <img className="not-found-bg" src={bg} alt="" />
      <h1>Nincs találat</h1>
    </div>
    // </BgWrap>
  );
};

export default SearchNot;
