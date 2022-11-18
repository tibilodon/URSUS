import "./RecipeItemStyles.css";
import { Paper, Box, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import moment from "moment";
import "moment/locale/hu";

import { useAppContext } from "../../Context/appContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import RecipeModal from "../Modal/RecipeModal";

const RecipeItem = ({
  _id,
  title,
  recipeType,
  difficulty,
  createdAt,
  timeMinutesValue,
  timeHoursValue,
  steps,
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
  const [moreData, setMoreData] = useState();
  const handleModal = () => {
    // console.log("click", recipe.title);
    // console.log("SOGGY HOTDOG BUN:", recipe);

    // setMoreData(data);
    setModal(!modal);
  };

  return (
    <>
      <Box sx={{ margin: "3em" }}>
        <Paper sx={{ width: "100%", padding: "1em" }}>
          <div className="item-wrap" onClick={handleModal}>
            <RecipeModal
              modal={modal}
              handleModal={handleModal}
              title={title}
              _id={_id}
              steps={steps}
              difficulty={difficulty}
            />
            <h1>title:{title}</h1>
            <h1>RecipeType:{recipeType}</h1>
            <h1>difficulty:{difficulty}</h1>
            <h1>createdAt:{date}</h1>
            <h1>_id:{_id}</h1>
            <h1>minutes:{timeMinutesValue}</h1>
            <h1>hours:{timeHoursValue}</h1>
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
        </Paper>
      </Box>
    </>
  );
};

export default RecipeItem;
