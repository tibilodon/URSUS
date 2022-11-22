import "./RecipeItemStyles.css";
import { Paper, Box, Fab, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import moment from "moment";
import "moment/locale/hu";

import { useAppContext } from "../../Context/appContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import RecipeModal from "../Modal/RecipeModal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ScaleIcon from "@mui/icons-material/Scale";
import HoveredItem from "./Hovered/HoveredItem";

const RecipeItem = ({
  _id,
  title,
  recipeType,
  difficulty,
  createdAt,
  timeMinutesValue,
  timeHoursValue,
  steps,
  ingredients,
}) => {
  // const data = {
  //   _id,
  //   title,
  //   recipeType,
  //   _id,
  //   title,
  //   recipeType,
  //   difficulty,
  //   createdAt,
  //   timeMinutesValue,
  //   timeHoursValue,
  // };
  const { setEditRecipe, deleteRecipe } = useAppContext();
  //moments - date
  moment.locale("hu");
  let date = moment(createdAt);
  date = date.format("l");

  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
    setHovered(false);
  };

  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        // onMouseMove={() => setModal(false)}
        sx={{
          boxShadow: `rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
    rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,
        }}
      >
        {hovered ? (
          <div className="hovered">
            <HoveredItem
              title={title}
              _id={_id}
              steps={steps}
              difficulty={difficulty}
              ingredients={ingredients}
              recipeType={recipeType}
              timeMinutesValue={timeMinutesValue}
              timeHoursValue={timeHoursValue}
            />
          </div>
        ) : null}
        <Paper sx={{ width: "100%", padding: "1em" }}>
          <div
            // onMouseOver={() => setModal(true)}
            // onMouseMove={() => setModal(false)}
            onClick={handleModal}
          >
            <div>
              <RecipeModal
                modal={modal}
                onClose={handleModal}
                title={title}
                _id={_id}
                steps={steps}
                difficulty={difficulty}
                ingredients={ingredients}
                recipeType={recipeType}
                timeMinutesValue={timeMinutesValue}
                timeHoursValue={timeHoursValue}
              />
            </div>

            <Typography
              sx={{ textAlign: "center" }}
              id="modal-modal-title"
              variant="h3"
              gutterBottom
            >
              {title.toUpperCase()}
            </Typography>
            <h3 className="createdAt">Készült:{date}</h3>

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
          </div>
          <div className="modify-btn-wrap spread">
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
        </Paper>
      </Box>
    </>
  );
};

export default RecipeItem;
