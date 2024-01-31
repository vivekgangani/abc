"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureExampleRoute = void 0;
// src/routes/exampleRoute.ts
const express_1 = __importDefault(require("express"));
const exampleController_1 = require("../controllers/exampleController");
const exampleValidation_1 = require("../validations/exampleValidation");
const configureExampleRoute = () => {
    const router = express_1.default.Router();
    router.get('/example', exampleValidation_1.exampleSchema, exampleController_1.getExampleController);
    return router;
};
exports.configureExampleRoute = configureExampleRoute;
