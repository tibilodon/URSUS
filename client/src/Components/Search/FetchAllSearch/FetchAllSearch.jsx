import "./FetchAllSearchStyles.css";

import InputField from "../../Input/InputField";
import { useAppContext } from "../../../Context/appContext";
import Pagination from "../../Pagination/Pagination";
import { Button, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const FetchAllSearch = ({
  handleChange,
  results,
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
                    disabled={!searchTerm}
                    variant="contained"
                    sx={{
                      width: "6em",
                    }}
                  >
                    Szűrők törlése
                  </Button>
                </div>
              </div>
              {searchTerm && results > 1 && <h1>Találat: {results}</h1>}
            </div>
          </form>
        </div>
      </ThemeProvider>
    </>
  );
};

export default FetchAllSearch;
