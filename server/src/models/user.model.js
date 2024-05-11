"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        default: "https://res.cloudinary.com/azurestore/image/upload/v1695735133/avatar_sialno.png",
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, {
    timestamps: true,
});
var User = mongoose_1.models.User || (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map