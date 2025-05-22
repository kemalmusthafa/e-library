import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
