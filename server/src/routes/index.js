"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_route_1 = __importDefault(require("./user.route"));
var withRoute = function (app) {
    app.use("/api/v1/users", user_route_1.default);
};
exports.default = withRoute;
//# sourceMappingURL=index.js.map