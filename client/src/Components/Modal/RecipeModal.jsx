import "./RecipeModalStyles.css";
import { Box, Fab } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/appContext";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ScaleIcon from "@mui/icons-material/Scale";

const RecipeModal = ({
  title,
  modal,
  handleModal,
  _id,
  steps,
  difficulty,
  recipeType,
  timeHoursValue,
  timeMinutesValue,
  ingredients,
}) => {
  // useEffect(() => {
  //   // mapFunc();
  // }, [steps]);
  // const { title, difficulty, steps, _id } = data;
  const { setEditRecipe, deleteRecipe } = useAppContext();
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35em",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    p: 4,
  };

  return (
    <div>
      <Modal
        open={modal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" gutterBottom>
            {title}
          </Typography>
          <div className="card-main-details">
            <div className="details-wrap">
              <ScaleIcon />
              <Typography ml={"0.3em"} id="modal-modal-description">
                {difficulty}
              </Typography>{" "}
            </div>

            <div className="details-wrap">
              <LocalDiningIcon />
              <Typography ml={"0.3em"} id="modal-modal-description">
                {recipeType}
              </Typography>{" "}
            </div>
            <div className="details-wrap">
              <AccessTimeIcon />
              <Typography ml={"0.3em"} id="modal-modal-description">
                {timeHoursValue && `${timeHoursValue} óra, `}{" "}
                {timeMinutesValue && `${timeMinutesValue} perc`}
              </Typography>{" "}
            </div>
          </div>
          <div className="ing-step-wrap">
            <div className="col">
              <h3>Hozzávalók:</h3>
              {ingredients &&
                ingredients.map((item, i) => {
                  return (
                    <div key={i}>
                      <li>
                        {item}
                        {/* {i + 1}. hozzávaló: {item} */}
                      </li>
                    </div>
                  );
                })}
            </div>
            <div className="col">
              <h3>Elkészítés:</h3>

              {steps &&
                steps.map((item, i) => {
                  return (
                    <div key={i}>
                      <p>
                        {i + 1}. lépés: {item}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="modify-btn-wrap">
            <div className="modify-btn-item">
              <Link to="/add-recipe" onClick={() => setEditRecipe(_id)}>
                <Fab color="secondary" aria-label="edit">
                  <EditIcon />
                </Fab>
              </Link>
            </div>
            <div>
              <Fab
                onClick={() => deleteRecipe(_id)}
                color="primary"
                aria-label="delete"
              >
                <DeleteForeverRoundedIcon />
              </Fab>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RecipeModal;
