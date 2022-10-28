import Recipe from "../models/Recipe.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest.js";
import NotFoundError from "../errors/notFound.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createRecipe = async (req, res) => {
  const { title, recipeType } = req.body;
  if (!title || !recipeType) {
    throw new BadRequestError("Please Provide All Values");
  }
  req.body.createdBy = req.user.userId;
  const recipe = await Recipe.create(req.body);
  res.status(StatusCodes.CREATED).json({ recipe });
};

const deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const recipe = await Recipe.findOne({ _id: recipeId });

  //check
  if (!recipe) {
    throw new NotFoundError(`No recipe with id: ${recipeId}`);
  }
  checkPermissions(req.user, recipe.createdBy);

  //remove
  await recipe.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Recipe removed" });
};

const getAllRecipes = async (req, res) => {
  const { search, difficulty, recipeType, sort } = req.query;
  const queryObject = { createdBy: req.user.userId };

  //add value based on condition
  //difficulty
  if (difficulty && difficulty !== "all") {
    queryObject.difficulty = difficulty;
  }
  //recipeType
  if (recipeType && recipeType !== "all") {
    queryObject.recipeType = recipeType;
  }
  //search
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
    //$regex:value, $options:(in this case) case insensitive
  }
  //await not needed
  let result = Recipe.find(queryObject);
  //chain SORT conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit; //that is 10
  result = result.skip(skip).limit(limit);

  const recipes = await result;
  const totalRecipes = await Recipe.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalRecipes / limit);

  res.status(StatusCodes.OK).json({ recipes, totalRecipes, numOfPages });
};

const updateRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { title, recipeType } = req.body;
  //check
  if (!title || !recipeType) {
    throw new BadRequestError("Please Provide All Values");
  }
  const recipe = await Job.findOne({ _id: recipeId });
  if (!recipe) {
    throw new NotFoundError(`No recipe with id ${recipeId}`);
  }
  //check permissions
  checkPermissions(req.user, recipe.createdBy);
  const updatedRecipe = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedRecipe });
};

//no need
const showStats = async (req, res) => {
  res.send("show stats");
};
export { createRecipe, deleteRecipe, getAllRecipes, updateRecipe, showStats };
