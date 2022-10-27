const createRecipe = async (req, res) => {
  res.send("create recipe");
};

const deleteRecipe = async (req, res) => {
  res.send("delete recipe");
};

const getAllRecipes = async (req, res) => {
  res.send("get all recipes");
};

const updateRecipe = async (req, res) => {
  res.send("update recipe");
};

const showStats = async (req, res) => {
  res.send("show stats");
};
export { createRecipe, deleteRecipe, getAllRecipes, updateRecipe, showStats };
