import "./SearchStyles.css";

import React from "react";
import { Button } from "@mui/material";

import InputField from "../Input/InputField";
import InputFieldSelect from "../Input/InputFieldSelect";
import { useAppContext } from "../../Context/appContext";
import Pagination from "../Pagination/Pagination";

const Search = () => {
  const {
    isLoading,
    search,
    searchDifficulty,
    searchType,
    sort,
    sortOptions,
    difficultyOptions,
    recipeTypeOptions,
    handleChange,
    clearFilters,
    numOfPages,
    // recipeType,
    // difficulty,
  } = useAppContext();

  const handleSearch = e => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleClearValues = e => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <div className="search">
      <form>
        {/* <Grid container flexDirection="column"> */}
        <div className="search-items">
          <div className="search-input">
            <InputField
              type="text"
              name="search"
              value={search}
              handleChange={handleSearch}
            />
          </div>
          <InputFieldSelect
            labelText="recipeType"
            list={["all", ...recipeTypeOptions]}
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
          />{" "}
          <InputFieldSelect
            labelText={"difficulty"}
            list={["all", ...difficultyOptions]}
            name="searchDifficulty"
            value={searchDifficulty}
            handleChange={handleSearch}
          />{" "}
          <InputFieldSelect
            labelText={"sort"}
            list={sortOptions}
            name="sort"
            value={sort}
            handleChange={handleSearch}
          />
          <Button
            onClick={handleClearValues}
            // type="button"
            disabled={isLoading}
            variant="contained"
            sx={{ width: "10em" }}
          >
            Szűrők törlése
          </Button>
        </div>
        {/* </Grid> */}
      </form>
      {numOfPages > 1 && <Pagination />}
    </div>
  );
};

export default Search;
