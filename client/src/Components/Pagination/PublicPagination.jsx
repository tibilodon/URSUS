import "./PaginationStyles.css";
import { Button, ButtonGroup, createTheme } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import { useAppContext } from "../../Context/appContext";
import { ThemeProvider } from "@emotion/react";

const PublicPagination = () => {
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

  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = numOfPages;
      //you can jump to the first page with this option:
      //newPage=1
    }
    changePage(newPage);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ButtonGroup>
          <Button
            type="button"
            color="third"
            onClick={prevPage}
            startIcon={<UndoIcon />}
            variant="contained"
          >
            Előző
          </Button>{" "}
          {pages.map(pageNumber => {
            return (
              <Button
                color={pageNumber === page ? "primary" : "secondary"}
                key={pageNumber}
                type="button"
                onClick={() => changePage(pageNumber)}
                variant="contained"
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            type="button"
            onClick={nextPage}
            color="third"
            endIcon={<RedoIcon />}
            variant="contained"
          >
            Következő
          </Button>
        </ButtonGroup>
      </ThemeProvider>
    </div>
  );
};

export default PublicPagination;
