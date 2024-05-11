import express from "express";
import {
	createUser,
	getProfile,
	loginWithGoogle,
	refreshToken,
	signIn,
} from "../controllers/user.controller";
import { currentUser } from "../middlewares/auth";

const Router = express.Router();

Router.route("/sign-up").post(createUser);
Router.route("/sign-in").post(signIn);
Router.route("/login-google").post(loginWithGoogle);
Router.route("/me").get(currentUser, getProfile);
Router.route("/refresh-token").post(refreshToken);

export default Router;
