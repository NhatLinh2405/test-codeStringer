"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.refreshToken = exports.loginWithGoogle = exports.signIn = exports.saveUser = exports.createUser = void 0;
var axios_1 = __importDefault(require("axios"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var models_1 = require("../models");
var utils_1 = require("../utils");
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, password, email, existingUser, existingField, newUser, _b, accessToken, refreshToken_1, response, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, name = _a.name, password = _a.password, email = _a.email;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4, models_1.User.findOne({ $or: [{ email: email }, { name: name }] })];
                case 2:
                    existingUser = _c.sent();
                    if (existingUser) {
                        existingField = existingUser.email === email ? "email" : "name";
                        return [2, res.status(400).json((0, utils_1.handleError)({ message: "".concat(existingField, " already exists") }, 400))];
                    }
                    newUser = new models_1.User({
                        name: name,
                        email: email,
                        password: bcryptjs_1.default.hashSync(password, 10),
                    });
                    _b = (0, utils_1.createJWT)(newUser._id, newUser.email, newUser.name), accessToken = _b.accessToken, refreshToken_1 = _b.refreshToken;
                    newUser.accessToken = accessToken;
                    newUser.refreshToken = refreshToken_1;
                    return [4, newUser.save()];
                case 3:
                    _c.sent();
                    response = {
                        accessToken: accessToken,
                        refreshToken: refreshToken_1,
                    };
                    return [2, res.status(201).json((0, utils_1.handleResponse)(response, 200, "User created successfully"))];
                case 4:
                    error_1 = _c.sent();
                    next(error_1);
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
}
exports.createUser = createUser;
function saveUser(userId, accessToken, refreshToken) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, models_1.User.updateOne({ _id: userId }, {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    })];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.saveUser = saveUser;
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, password, email, user, _b, accessToken, refreshToken_2, response, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, password = _a.password, email = _a.email;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 5, , 6]);
                    return [4, models_1.User.findOne({
                            email: email,
                        })];
                case 2:
                    user = _c.sent();
                    if (!user) {
                        return [2, res.status(404).json((0, utils_1.handleError)({ message: "User not found" }, 404))];
                    }
                    if (!(user && bcryptjs_1.default.compareSync(password, user.password))) return [3, 4];
                    _b = (0, utils_1.createJWT)(user._id, user.email, user.name), accessToken = _b.accessToken, refreshToken_2 = _b.refreshToken;
                    return [4, saveUser(user._id, accessToken, refreshToken_2)];
                case 3:
                    _c.sent();
                    response = {
                        accessToken: accessToken,
                        refreshToken: refreshToken_2,
                    };
                    return [2, res.status(200).json((0, utils_1.handleResponse)(response, 200, "User signed in successfully"))];
                case 4: return [2, res.status(401).json((0, utils_1.handleError)({ message: "Wrong password" }, 401))];
                case 5:
                    error_2 = _c.sent();
                    next(error_2);
                    return [3, 6];
                case 6: return [2];
            }
        });
    });
}
exports.signIn = signIn;
var loginWithGoogle = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, name_1, picture, sub, user, newUser, _b, accessToken_1, refreshToken_3, _c, accessToken, refreshToken_4, error_3;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 6, , 7]);
                return [4, axios_1.default
                        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                        headers: {
                            Authorization: "Bearer ".concat(req.body.tokenId),
                        },
                    })
                        .then(function (response) { return response.data; })];
            case 1:
                _a = _d.sent(), email = _a.email, name_1 = _a.name, picture = _a.picture, sub = _a.sub;
                return [4, models_1.User.findOne({ email: email })];
            case 2:
                user = _d.sent();
                if (!!user) return [3, 4];
                newUser = new models_1.User({
                    name: name_1,
                    email: email,
                    image: picture,
                    password: bcryptjs_1.default.hashSync(sub, 10),
                });
                _b = (0, utils_1.createJWT)(newUser._id, newUser.email, newUser.name), accessToken_1 = _b.accessToken, refreshToken_3 = _b.refreshToken;
                newUser.accessToken = accessToken_1;
                newUser.refreshToken = refreshToken_3;
                return [4, newUser.save()];
            case 3:
                _d.sent();
                return [2, res
                        .status(201)
                        .json((0, utils_1.handleResponse)({ accessToken: accessToken_1, refreshToken: refreshToken_3 }, 201, "User created successfully"))];
            case 4:
                _c = (0, utils_1.createJWT)(user._id, user.email, user.name), accessToken = _c.accessToken, refreshToken_4 = _c.refreshToken;
                return [4, saveUser(user._id, accessToken, refreshToken_4)];
            case 5:
                _d.sent();
                return [2, res
                        .status(200)
                        .json((0, utils_1.handleResponse)({ accessToken: accessToken, refreshToken: refreshToken_4 }, 200, "User signed in successfully"))];
            case 6:
                error_3 = _d.sent();
                next(error_3);
                return [3, 7];
            case 7: return [2];
        }
    });
}); };
exports.loginWithGoogle = loginWithGoogle;
function refreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var refreshToken, user, _a, accessToken, newRefreshToken, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    refreshToken = req.body.refreshToken;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4, models_1.User.findOne({
                            refreshToken: refreshToken,
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        res.status(404).json((0, utils_1.handleError)({ message: "User not found" }, 404));
                    }
                    _a = (0, utils_1.createJWT)(user._id, user.email, user.name), accessToken = _a.accessToken, newRefreshToken = _a.refreshToken;
                    return [4, saveUser(user._id, accessToken, newRefreshToken)];
                case 3:
                    _b.sent();
                    res.status(200).json({
                        message: "Token refreshed successfully",
                        data: {
                            accessToken: accessToken,
                            refreshToken: newRefreshToken,
                        },
                    });
                    return [3, 5];
                case 4:
                    error_4 = _b.sent();
                    next(error_4);
                    return [3, 5];
                case 5: return [2];
            }
        });
    });
}
exports.refreshToken = refreshToken;
var getProfile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                return [4, models_1.User.findById(user._id)];
            case 1:
                userData = _a.sent();
                if (!userData)
                    throw (0, utils_1.handleError)(new Error("User not found"), 404);
                res.status(200).json((0, utils_1.handleResponse)(userData, 200, "User profile fetched successfully"));
                return [3, 3];
            case 2:
                error_5 = _a.sent();
                next(error_5);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.getProfile = getProfile;
//# sourceMappingURL=user.controller.js.map