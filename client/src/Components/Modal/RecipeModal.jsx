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

const RecipeModal = ({ title, modal, handleModal, _id, steps, difficulty }) => {
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
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const test = () => {
    console.log("yo");
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            difficulty:{difficulty}
          </Typography>{" "}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          {/* {dat} */}
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
