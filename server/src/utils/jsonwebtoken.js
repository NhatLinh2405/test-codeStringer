"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var signToken = function (payload, expiresIn) {
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
};
var createJWT = function (_id, email, name) {
    var payload = { _id: _id, email: email, name: name };
    return {
        accessToken: signToken(payload, String(process.env.ACCESS_TOKEN_EXP)),
        refreshToken: signToken(payload, String(process.env.REFRESH_TOKEN_EXP)),
    };
};
exports.createJWT = createJWT;
var verifyJWT = function (token) {
    return new Promise(function (resolve, reject) {
        try {
            var decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            resolve(decoded);
        }
        catch (error) {
            reject(error);
        }
    });
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jsonwebtoken.js.map