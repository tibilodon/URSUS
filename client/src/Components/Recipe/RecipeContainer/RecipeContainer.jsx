import "./RecipeContainerStyles.css";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import RecipeItem from "../RecipeItem";
import Pagination from "../../Pagination/Pagination";
import RecipeModal from "../../Modal/RecipeModal";

const RecipeContainer = () => {
  const [modal, setModal] = useState(false);
  const [moreData, setMoreData] = useState();

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

  const handleModal = recipe => {
    console.log("click", recipe.title);
    console.log("SOGGY HOTDOG BUN:", recipe);
    let data = recipe;
    setMoreData(data);
    setModal(!modal);
  };

  const data = (
    <div>
      <h1>{moreData}</h1>
    </div>
  );

  return (
    <>
      <Grid container justifyContent="space-between">
        <h2>{totalRecipes} recept található</h2>
        {numOfPages > 1 && <Pagination />}
        {/* {<div>LOOK AT ME CUNT: {data && data}</div>} */}
        <RecipeModal {...moreData} modal={modal} handleModal={handleModal} />
        {recipes.map(recipe => {
          return (
            <div
              key={recipe._id}
              className="modal-wrap"
              onClick={() => handleModal(recipe)}
            >
              <RecipeItem key={recipe._id} {...recipe} />
            </div>
          );
        })}
      </Grid>
    </>
  );
};

export default RecipeContainer;
