// src/validation/exampleValidation.ts
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const exampleSchema = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required().error(new Error('Name is required')),
    userType: Joi.string().required().error(new Error('User type is required')),
    email: Joi.string().email().required().error(new Error('Email is required')),
    phoneNumber: Joi.string().required().error(new Error('Number is required')),
    roleId: Joi.string().required().error(new Error('Role id is required')),
    roleName: Joi.string().required().error(new Error('Role name is required')),
    isActive: Joi.number().required().error(new Error('isActive is required')),
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