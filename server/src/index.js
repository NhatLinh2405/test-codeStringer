"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config"));
var error_1 = require("./middlewares/error");
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 8000;
(0, config_1.default)(app);
(0, routes_1.default)(app);
app.use("*", function (req, res) {
    res.status(400).send("Route not found");
});
app.use(error_1.errorMiddleware);
app.listen(PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(PORT));
});
//# sourceMappingURL=index.js.map