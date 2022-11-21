import "./RecipeContainerStyles.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../RecipeItem";
import Pagination from "../../Pagination/Pagination";
import RecipeModal from "../../Modal/RecipeModal";

const RecipeContainer = () => {
  // const [moreData, setMoreData] = useState();

  const {
    //recipes
    getRecipes,
    recipes,
    //loading
    isLoading,
    //search
    page,
    totalRecipes,
    search,
    searchType,
    searchDifficulty,
    // recipeType,
    // difficulty,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getRecipes();
  }, [search, searchType, searchDifficulty, sort, page]);

  if (isLoading) {
    return <h1>ISLOADING</h1>;
  }

  if (recipes.length === 0) {
    return <h1>NO RECIPES TO BE DISPLAYED</h1>;
  }

  return (
    <>
      {/* <div className="recipes-wrap"> */}
      <h2 className="recipes-hero">Saját receptjeim: {totalRecipes} </h2>
      {/* {<div>LOOK AT ME CUNT: {data && data}</div>} */}
      {/* <RecipeModal {...moreData} modal={modal} handleModal={handleModal} /> */}
      <Grid
        container
        justifyContent={"center"}
        // rowSpacing={2}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {recipes.map(recipe => {
          return (
            <div key={recipe._id}>
              <Grid item xs={12} sx={{ margin: "2em" }}>
                <RecipeItem key={recipe._id} {...recipe} />
              </Grid>
            </div>
          );
        })}
        {/* </div> */}
      </Grid>
    </>
  );
};

export default RecipeContainer;
