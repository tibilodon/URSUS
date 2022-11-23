import "./SearchStyles.css";

import React from "react";
import { Button, createTheme, Box } from "@mui/material";

import InputField from "../Input/InputField";
import InputFieldSelect from "../Input/InputFieldSelect";
import { useAppContext } from "../../Context/appContext";
import Pagination from "../Pagination/Pagination";
import { ThemeProvider } from "@emotion/react";
import EventIcon from "@mui/icons-material/Event";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ScaleIcon from "@mui/icons-material/Scale";

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

  const theme = createTheme({
    typography: {
      h2: {
        fontSize: 80,
      },
    },
    palette: {
      primary: {
        main: "#1769aa",
      },
      secondary: {
        main: "#ed6c02",
        // main: "#f44336",
      },
      third: {
        main: "#9c27b0",
      },
    },
  });

  const handleSearch = e => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleClearValues = e => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="search">
        <form>
          {/* <Grid container flexDirection="column"> */}

          <div className="search-items">
            <div className="search-align">
              <div className="search-input">
                <InputField
                  searchLabel={"keresés"}
                  type="text"
                  name="search"
                  value={search}
                  handleChange={handleSearch}
                />
              </div>
              <div className="search-input-wrap">
                <div className="search-select">
                  <div className="add-icon">
                    <ScaleIcon />
                  </div>
                  <InputFieldSelect
                    // labelText={"difficulty"}
                    list={["all", ...difficultyOptions]}
                    name="searchDifficulty"
                    value={searchDifficulty}
                    handleChange={handleSearch}
                  />{" "}
                </div>
                <div className="search-select">
                  <div className="add-icon">
                    <LocalDiningIcon />
                  </div>
                  <InputFieldSelect
                    // labelText="recipeType"
                    list={["all", ...recipeTypeOptions]}
                    name="searchType"
                    value={searchType}
                    handleChange={handleSearch}
                  />{" "}
                </div>
                <div className="search-select">
                  <div className="add-icon">
                    <EventIcon />
                  </div>
                  <InputFieldSelect
                    // labelText={"rendezés"}
                    list={sortOptions}
                    name="sort"
                    value={sort}
                    handleChange={handleSearch}
                  />
                </div>{" "}
              </div>
              <div className="search-btn">
                <Button
                  onClick={handleClearValues}
                  // type="button"
                  disabled={isLoading}
                  variant="contained"
                  sx={{
                    width: "6em",
                    // paddingLeft: "1.5em",
                    // paddingRight: "1.5em",
                  }}
                >
                  Szűrők törlése
                </Button>
              </div>
            </div>
            <div className="pagination-align">
              {numOfPages > 1 && <Pagination />}
            </div>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Search;
