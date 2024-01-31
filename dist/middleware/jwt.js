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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.refreshToken = exports.generateToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });
};
exports.generateToken = generateToken;
const refreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
};
exports.refreshToken = refreshToken;
const verifyToken = (req) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const verifyToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
            if (verifyToken) {
                return verifyToken;
            }
        }
        return null;
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const generateHash = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcryptjs_1.default.hash(text, 10);
    return hash;
});
exports.generateHash = generateHash;
