import "./PaginationStyles.css";
import { Button, ButtonGroup, createTheme } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import { useAppContext } from "../../Context/appContext";
import { ThemeProvider } from "@emotion/react";

const PublicPagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  page,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

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

  // console.log("PAGENUMBERS", pageNumbers);
  // console.log("PAGE FROM ", page + 1);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ButtonGroup>
          <Button
            type="button"
            color="third"
            onClick={() => prevPage(pageNumbers.length)}
            startIcon={<UndoIcon />}
            variant="contained"
          >
            Előző
          </Button>{" "}
          {pageNumbers.map(pageNumber => {
            return (
              <Button
                // color={pageNumber === page ? "primary" : "secondary"}
                key={pageNumber}
                type="button"
                onClick={() => paginate(pageNumber)}
                variant="contained"
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            type="button"
            // onClick={nextPage}
            onClick={() => nextPage(pageNumbers.length)}
            // onClick={() =>
            //   paginate(pageNumbers.length > 1 && pageNumbers.length + 1)
            // }
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
