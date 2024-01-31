"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server/server.ts
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../database/mongodb");
const routes_1 = require("../routes");
const authMiddleware_1 = require("../middleware/authMiddleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Connect to MongoDB
(0, mongodb_1.connectToDatabase)()
    .then(() => {
    app.use(authMiddleware_1.authMiddleWare);
    // Configure routes
    (0, routes_1.configureRoutes)(app);
    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
