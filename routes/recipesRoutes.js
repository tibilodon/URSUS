import express from "express";
const router = express.Router();

import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
} from "../controllers/recipesController.js";

router.route("/").post(createRecipe).get(getAllRecipes);

//:id where specific recipe needed

router.route("/:id").delete(deleteRecipe).patch(updateRecipe);

export default router;
