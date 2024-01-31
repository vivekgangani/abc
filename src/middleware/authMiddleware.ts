import { Response, Request, NextFunction } from 'express';
import { RESPONSE_CODES } from '../config/constants';
import { verifyToken } from './jwt';
import { initLogger, logError, logInfo } from './logger';

interface LogObject {
  ip: string;
  headers: string | string[];
  method: string;
  url: string;
  timestamp: number;
  user?: any; // Adjust the type based on your user object structure
}

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await initLogger();
    const ignorePaths = ['/api_v_1/auth/login', '/api_v_1/auth/register'];
    const { method, headers, originalUrl } = req;

    const ip: string = Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';

      const headersValue: string | string[] = (req.headers as unknown) as string | string[] || '';


    const logObj: LogObject = {
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
      res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error: 'Missing auth token' });
      return;
    }

    logObj.user = await verifyToken(req);
    logInfo('Activity Log: ', logObj);

    next();
  } catch (error) {
    logError('Error in authMiddleware: ', error as Record<string, any>);
    res.status(RESPONSE_CODES.UNAUTHORIZED).json({ error });
  }
};
