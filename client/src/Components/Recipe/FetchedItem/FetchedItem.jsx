import "./FetchedItemStyles.css";
import { useState } from "react";

import { Paper, Box, Typography } from "@mui/material";
import moment from "moment";
import "moment/locale/hu";
import RecipeModal from "../../Modal/RecipeModal";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ScaleIcon from "@mui/icons-material/Scale";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const FetchedItem = ({ recipe }) => {
  const {
    title,
    recipeType,
    difficulty,
    createdAt,
    timeMinutesValue,
    timeHoursValue,
    steps,
    ingredients,
    imgURL,
  } = recipe;
  moment.locale("hu");
  let date = moment(createdAt);
  date = date.format("l");

  //modal
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
    setHovered(false);
  };

  //hover
  const [hovered, setHovered] = useState(false);

  const edit = false;

  return (
    <>
      <div>
        <Box
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            cursor: "pointer",
            boxShadow: hovered
              ? `-5px -5px 30px 5px #00457e, 5px 5px 30px 5px #333`
              : `rgba(67, 71, 85, 0.27) 0px 0px 0.25em,
  rgba(90, 125, 188, 0.05) 0px 0.25em 1em`,
          }}
        >
          <Paper sx={{ width: "100%", padding: "1em" }}>
            <div className="item-wrap" onClick={handleModal}>
              <div>
                <RecipeModal
                  modal={modal}
                  onClose={handleModal}
                  title={title}
                  steps={steps}
                  difficulty={difficulty}
                  ingredients={ingredients}
                  recipeType={recipeType}
                  timeMinutesValue={timeMinutesValue}
                  timeHoursValue={timeHoursValue}
                  edit={edit}
                />
              </div>

              <div className="hero-title">
                <h1>{title}</h1>
                {imgURL && (
                  <img style={{ width: "4em" }} src={imgURL} alt={""} />
                )}
              </div>
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
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default FetchedItem;
