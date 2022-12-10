import React from "react";
import bg from "../../Assets/not-found-bg.jpg";

const SearchNot = () => {
  return (
    <div className="not-found">
      <img className="not-found-bg" src={bg} alt="" />
      <h1>Nincs találat</h1>
    </div>
  );
};

export default SearchNot;
