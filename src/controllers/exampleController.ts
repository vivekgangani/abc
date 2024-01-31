// src/controllers/exampleController.ts
import { Request, Response } from 'express';
import { getExample } from '../services/exampleService';

export const getExampleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getExample();
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
