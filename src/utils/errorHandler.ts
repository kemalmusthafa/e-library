import { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/client';  // Import Prisma errors

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(err);

  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
    }
    
    if (err.code === 'P2002') {
      return res.status(409).json({
        status: 'error',
        message: 'Duplicate entry'
      });
    }
  }

  if (err instanceof PrismaClientValidationError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
    });
  }

  // Handle custom app errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle other errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

