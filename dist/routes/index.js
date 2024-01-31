"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const exampleRoute_1 = require("./exampleRoute");
const configureRoutes = (app) => {
    app.use('/', (0, exampleRoute_1.configureExampleRoute)());
};
exports.configureRoutes = configureRoutes;
