"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var auth_1 = require("../middlewares/auth");
var Router = express_1.default.Router();
Router.route("/sign-up").post(user_controller_1.createUser);
Router.route("/sign-in").post(user_controller_1.signIn);
Router.route("/login-google").post(user_controller_1.loginWithGoogle);
Router.route("/me").get(auth_1.currentUser, user_controller_1.getProfile);
Router.route("/refresh-token").post(user_controller_1.refreshToken);
exports.default = Router;
//# sourceMappingURL=user.route.js.map