import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);  
  };
};
