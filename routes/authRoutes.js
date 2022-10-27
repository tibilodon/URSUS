import express from "express";
import { register, login, updateUser } from "../controllers/authController.js";
import auth from "../middleware/auth.js";

//security package for build, ONLY affects REGISTER & LOGIN in this case, can be set up for entire app in server.js --look at docs--
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const router = express.Router();

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(auth, updateUser);

export default router;
