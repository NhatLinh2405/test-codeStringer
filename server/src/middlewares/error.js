"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, _req, res, next) {
    var status = error.status || 500;
    var message = error.message || "Something went wrong";
    res.status(status).send({
        message: message,
        status: status,
    });
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map