import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

interface User {
  // Define the properties of your user object here
  // For example: id: string;
}

const generateToken = (user: User): string => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY as string, { expiresIn: '15d' });
};

const refreshToken = (user: User): string => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY as string, { expiresIn: '7d' });
};

const verifyToken = (req: Request): User | null => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split(' ')[1];
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        if (verifyToken) {
          return verifyToken as User;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  };

const generateHash = async (text: string): Promise<string> => {
  const hash = await bcrypt.hash(text, 10);
  return hash;
};

export {
  verifyToken,
  generateToken,
  refreshToken,
  generateHash
};
