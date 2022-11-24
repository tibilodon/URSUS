//TODO:FOR BUILD ONLY
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// security packages for build
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

//db and authUser
import connectDB from "./db/connect.js";

//routes
import authRouter from "./routes/authRoutes.js";
import recipesRouter from "./routes/recipesRoutes.js";

//TODO: ---FETCH ALL----
import fetchAllRouter from "./routes/fetchAllRoutes.js";

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

import morgan from "morgan";

import auth from "./middleware/auth.js";

const app = express();
dotenv.config();
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
  //TODO:add for build
  app.use(express.static("client/build"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

//TODO:add for build
app.use(express.static(path.resolve(__dirname, "./client/build")));

//cors
app.use(cors());

app.use(express.json());

//TODO:security packages init ADD FOR DEPLOY
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", auth, recipesRouter);
app.use("/api/v1/all", fetchAllRouter);

//TODO:ADD for build
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listening at: ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
