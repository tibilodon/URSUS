import "./FetchedItemStyles.css";
import { useEffect, useState } from "react";

import { Paper, Box, Fab } from "@mui/material";
import moment from "moment";
import "moment/locale/hu";

const FetchedItem = ({ recipe }) => {
  const { title, recipeType, createdAt, timeMinutesValue, timeHoursValue } =
    recipe;
  moment.locale("hu");
  let date = moment(createdAt);
  date = date.format("l");

  return (
    <>
      <div>
        <Box sx={{ margin: "3em" }}>
          <Paper sx={{ width: "50%", padding: "1em" }}>
            <h1>title:{title}</h1>
            <h1>RecipeType:{recipeType}</h1>
            <h1>createdAt:{date}</h1>
            <h1>minutes:{timeMinutesValue}</h1>
            <h1>hours:{timeHoursValue}</h1>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default FetchedItem;
