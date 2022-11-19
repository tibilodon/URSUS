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
            <Typography id="modal-modal-description">{difficulty}</Typography>{" "}
            <Typography id="modal-modal-description">{recipeType}</Typography>{" "}
            <Typography id="modal-modal-description">
              {timeHoursValue} óra, {timeMinutesValue} perc
            </Typography>{" "}
          </div>
          {steps &&
            steps.map((item, i) => {
              return (
                <div key={i}>
                  <p>
                    step{i + 1}---{item}
                  </p>
                </div>
              );
            })}
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
