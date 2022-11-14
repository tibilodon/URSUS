import "./PaginationStyles.css";
import { Button, ButtonGroup } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import { useAppContext } from "../../Context/appContext";

const Pagination = () => {
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
      <ButtonGroup>
        <Button
          type="button"
          color="secondary"
          onClick={prevPage}
          startIcon={<UndoIcon />}
          variant="contained"
        >
          Előző
        </Button>{" "}
        {pages.map(pageNumber => {
          return (
            <Button
              key={pageNumber}
              type="button"
              onClick={() => changePage(pageNumber)}
              variant="contained"
            >
              {pageNumber}
            </Button>
          );
        })}
        {/* <Button
          type="button"
          // onClick={addHandler}
          variant="contained"
        >
          1
        </Button> */}
        <Button
          type="button"
          onClick={nextPage}
          color="secondary"
          endIcon={<RedoIcon />}
          variant="contained"
        >
          Következő
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
