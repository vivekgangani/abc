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
exports.logSilly = exports.logDebug = exports.logWarn = exports.logError = exports.logInfo = exports.initLogger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const logFileName = path_1.default.join(__dirname, '../../../', 'logs/app.log');
const errorLogFileName = path_1.default.join(__dirname, '../../../', 'logs/error.log');
let logger = null;
function initLogger() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            logger = yield winston_1.default.createLogger({
                format: winston_1.default.format.json(),
                exceptionHandlers: [
                    new winston_1.default.transports.Console(),
                    new winston_1.default.transports.File({
                        filename: errorLogFileName,
                        level: 'error'
                    })
                ],
                transports: [
                    new winston_1.default.transports.Console(),
                    // new winston.transports.File({
                    //     filename: logFileName
                    // })
                ]
            });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.initLogger = initLogger;
function logInfo(message, data) {
    logger === null || logger === void 0 ? void 0 : logger.log('info', message, data);
}
exports.logInfo = logInfo;
function logError(message, data) {
    logger === null || logger === void 0 ? void 0 : logger.log('error', message, data);
}
exports.logError = logError;
function logWarn(message, data) {
    logger === null || logger === void 0 ? void 0 : logger.log('warn', message, data);
}
exports.logWarn = logWarn;
function logDebug(message, data) {
    logger === null || logger === void 0 ? void 0 : logger.log('debug', message, data);
}
exports.logDebug = logDebug;
function logSilly(message, data) {
    logger === null || logger === void 0 ? void 0 : logger.log('silly', message, data);
}
exports.logSilly = logSilly;
