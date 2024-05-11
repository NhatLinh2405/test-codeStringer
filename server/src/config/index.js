"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = __importDefault(require("../database/db"));
var withConfig = function (app) {
    (0, db_1.default)();
    app.use(express_1.default.static("public"));
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(express_1.default.json({ limit: "1000" }));
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.default = withConfig;
//# sourceMappingURL=index.js.map