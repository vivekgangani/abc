// src/routes/index.ts
import express, { Express } from 'express';
import { configureExampleRoute } from './exampleRoute';

export const configureRoutes = (app: Express): void => {
  app.use('/', configureExampleRoute());
  
};
