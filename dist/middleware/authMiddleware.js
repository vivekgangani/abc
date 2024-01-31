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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleWare = void 0;
const constants_1 = require("../config/constants");
const jwt_1 = require("./jwt");
const logger_1 = require("./logger");
const authMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, logger_1.initLogger)();
        const ignorePaths = ['/api_v_1/auth/login', '/api_v_1/auth/register'];
        const { method, headers, originalUrl } = req;
        const ip = Array.isArray(req.headers['x-forwarded-for'])
            ? req.headers['x-forwarded-for'][0]
            : req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
        const headersValue = req.headers || '';
        const logObj = {
            ip,
            headers: headersValue,
            method: req.method,
            url: req.originalUrl,
            timestamp: Date.now(),
        };
        const ignoreIndex = ignorePaths.findIndex((item) => item === originalUrl.split('?')[0]);
        if (ignoreIndex > -1) {
            return next();
        }
        if (!headers.authorization) {
            res.status(constants_1.RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Missing auth token' });
            return;
        }
        logObj.user = yield (0, jwt_1.verifyToken)(req);
        (0, logger_1.logInfo)('Activity Log: ', logObj);
        next();
    }
    catch (error) {
        (0, logger_1.logError)('Error in authMiddleware: ', error);
        res.status(constants_1.RESPONSE_CODES.UNAUTHORIZED).json({ error });
    }
});
exports.authMiddleWare = authMiddleWare;
