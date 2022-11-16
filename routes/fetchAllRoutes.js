import express from "express";
const router = express.Router();

import { fetchAll } from "../controllers/recipesController.js";

// fetchAll
router.route("/").get(fetchAll);

export default router;
