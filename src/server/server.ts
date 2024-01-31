// src/server/server.ts
import express from 'express';
import { connectToDatabase } from '../database/mongodb';
import { configureRoutes } from '../routes';
import { authMiddleWare } from '../middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    app.use(authMiddleWare)
    // Configure routes
    configureRoutes(app);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
