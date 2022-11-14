import "./SearchStyles.css";

import React from "react";
import { Box, Grid, Button } from "@mui/material";

import InputField from "../Input/InputField";
import InputFieldSelect from "../Input/InputFieldSelect";
import { useAppContext } from "../../Context/appContext";

const Search = () => {
  const {
    isLoading,
    recipeTypeOptions,
    difficultyOptions,
    sortOptions,
    searchType,
    searchDifficulty,
    sort,
    search,
    clearValues,
    handleChange,
    recipeType,
    difficulty,
  } = useAppContext();

  const handleSearch = e => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleClearValues = e => {
    e.preventDefault();
    clearValues();
  };

  return (
    <div className="search">
      <form>
        {/* <Grid container flexDirection="column"> */}
        <div className="search-items">
          <div className="search-input">
            <InputField
              type="text"
              value={search}
              name="search"
              handleChange={handleSearch}
            />
          </div>
          <InputFieldSelect
            labelText="recipeType"
            list={["all", ...recipeTypeOptions]}
            name="recipeType"
            value={recipeType}
            handleChange={handleSearch}
          />{" "}
          <InputFieldSelect
            labelText={"difficulty"}
            list={["all", ...difficultyOptions]}
            name="difficulty"
            value={difficulty}
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
            type="button"
            disabled={isLoading}
            variant="contained"
            sx={{ width: "10em" }}
          >
            Szűrők törlése
          </Button>
        </div>
        {/* </Grid> */}
      </form>
    </div>
  );
};

export default Search;
