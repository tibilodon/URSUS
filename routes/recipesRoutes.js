import express from "express";
const router = express.Router();
import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../client/public/uploads/");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.fieldname, originalname);
//   },
// });

// const upload = multer({ storage: storage });

// const upload = multer({ dest: "uploads/" });

import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
} from "../controllers/recipesController.js";

// , upload.single("recipeImage")
router.route("/").post(createRecipe).get(getAllRecipes);

// app.post("/", upload.single("recipeImage"), (req, res) => {
//   console.log(req.files); // this does log the uploaded image data.
// });

// router.post("/", upload.single("recipeImage")),
//   (req, res) => {
//     const recipeImage = new RecipeImage({
//       recipeImage: req.file.recipeImage,
//     });

//     recipeImage.save();
//   };

//:id where specific recipe needed

router.route("/:id").delete(deleteRecipe).patch(updateRecipe);

export default router;
