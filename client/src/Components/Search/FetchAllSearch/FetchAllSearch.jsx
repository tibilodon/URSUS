import "./FetchAllSearchStyles.css";

import InputField from "../../Input/InputField";
import InputFieldSelect from "../../Input/InputFieldSelect";

import { useState } from "react";
import { useAppContext } from "../../../Context/appContext";

const FetchAllSearch = ({
  recType,
  handleChange,
  recDiff,
  handleClearValues,
  searchTerm,
}) => {
  const { recipeTypeOptions, difficultyOptions } = useAppContext();

  return (
    <>
      <div className="fetch-search-wrap">
        <InputField
          value={searchTerm}
          type="text"
          searchLabel={"keresés"}
          handleChange={handleChange}
          name="search"
        />
        {/* rectype
        <InputFieldSelect
          value={recType}
          list={["összes", ...recipeTypeOptions]}
          handleChange={handleChange}
          name="searchType"
        />{" "}
        recdiff
        <InputFieldSelect
          value={recDiff}
          list={["összes", ...difficultyOptions]}
          handleChange={handleChange}
          name="searchDifficulty"
        /> */}
        <button onClick={handleClearValues}>CLEAR</button>
      </div>
    </>
  );
};

export default FetchAllSearch;
