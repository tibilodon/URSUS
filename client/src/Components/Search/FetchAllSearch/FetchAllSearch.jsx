import "./FetchAllSearchStyles.css";

import InputField from "../../Input/InputField";
import { useAppContext } from "../../../Context/appContext";
import Pagination from "../../Pagination/Pagination";
import { Button, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const FetchAllSearch = ({
  handleChange,

  handleClearValues,
  searchTerm,
}) => {
  const { isLoading } = useAppContext();
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
      },
      third: {
        main: "#9c27b0",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="search">
          <form>
            <div className="search-items">
              <div className="search-align">
                <div className="search-input">
                  <InputField
                    searchLabel={"keresés"}
                    type="text"
                    name="search"
                    value={searchTerm}
                    handleChange={handleChange}
                  />
                </div>
                <div className="search-btn">
                  <Button
                    onClick={handleClearValues}
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                      width: "6em",
                    }}
                  >
                    Szűrők törlése
                  </Button>
                </div>
              </div>
              <div className="pagination-align">{<Pagination />}</div>
            </div>
          </form>
        </div>
        {/* <div className="fetch-search-wrap">
          <InputField
            value={searchTerm}
            type="text"
            searchLabel={"keresés"}
            handleChange={handleChange}
            name="search"
          />
          <div className="search-btn">
            <Button
              onClick={handleClearValues}
              disabled={isLoading}
              variant="contained"
              sx={{
                width: "6em",
              }}
            >
              Szűrők törlése
            </Button>
          </div>
          <div className="pagination-align">{<Pagination />}</div>
        </div> */}
      </ThemeProvider>
    </>
  );
};

export default FetchAllSearch;
