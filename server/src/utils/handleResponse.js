"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = exports.handleError = void 0;
var handleError = function (error, statusCode) {
    var status = statusCode || 500;
    var message = error.message || "Something went wrong";
    throw {
        status: status,
        message: message,
    };
};
exports.handleError = handleError;
var handleResponse = function (data, statusCode, message) {
    return {
        statusCode: statusCode,
        message: message,
        data: data,
    };
};
exports.handleResponse = handleResponse;
//# sourceMappingURL=handleResponse.js.map