import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

//db and authUser
import connectDB from "./db/connect.js";

//routes
import authRouter from "./routes/authRoutes.js";
import recipesRouter from "./routes/recipesRoutes.js";

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

const app = express();
dotenv.config();

//cors
app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/recipes", recipesRouter);

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
