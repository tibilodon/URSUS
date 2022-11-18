import "./RecipeModalStyles.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const RecipeModal = ({ modal, handleModal, title, difficulty, steps }) => {
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

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  let dat;
  if (steps) {
    dat = steps.map((item, i) => {
      return (
        <div key={i}>
          <p>
            step{i + 1}--->{item}
          </p>
        </div>
      );
    });
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
            {steps}
          </Typography>{" "}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
          {/* {dat} */}
          {steps &&
            steps.map((item, i) => {
              return (
                <div key={i}>
                  <p>
                    step{i + 1}--->{item}
                  </p>
                </div>
              );
            })}
        </Box>
      </Modal>
    </div>
  );
};

export default RecipeModal;
