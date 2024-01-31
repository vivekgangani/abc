"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleSchema = void 0;
// src/validation/exampleValidation.ts
const joi_1 = __importDefault(require("joi"));
const exampleSchema = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required().error(new Error('Name is required')),
        userType: joi_1.default.string().required().error(new Error('User type is required')),
        email: joi_1.default.string().email().required().error(new Error('Email is required')),
        phoneNumber: joi_1.default.string().required().error(new Error('Number is required')),
        roleId: joi_1.default.string().required().error(new Error('Role id is required')),
        roleName: joi_1.default.string().required().error(new Error('Role name is required')),
        isActive: joi_1.default.number().required().error(new Error('isActive is required')),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 0,
            statusCode: 400,
            msg: error.message,
        });
    }
    next();
};
exports.exampleSchema = exampleSchema;
