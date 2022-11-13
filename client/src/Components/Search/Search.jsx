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
    <div>
      <form>
        <Grid container flexDirection="column">
          <InputField
            type="text"
            value={search}
            name="search"
            handleChange={handleSearch}
          />
          <InputFieldSelect
            labelText="recipeType"
            list={["all", ...recipeTypeOptions]}
            name="recipeType"
            value={searchType}
            handleChange={handleSearch}
          />{" "}
          <InputFieldSelect
            labelText={"difficulty"}
            list={["all", ...difficultyOptions]}
            name="recipeType"
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
            type="button"
            disabled={isLoading}
            variant="contained"
            sx={{ width: "10em" }}
          >
            Szűrők törlése
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Search;
