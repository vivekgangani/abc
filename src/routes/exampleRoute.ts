// src/routes/exampleRoute.ts
import express, { Router } from 'express';
import { getExampleController } from '../controllers/exampleController';
import { exampleSchema } from '../validations/exampleValidation';

export const configureExampleRoute = (): Router => {
  const router = express.Router();
  router.get('/example', exampleSchema, getExampleController);

  return router;
};
