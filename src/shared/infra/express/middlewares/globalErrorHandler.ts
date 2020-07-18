import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): any {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
  console.log(err);
  return response.status(500).json({
    status: 500,
    message: err.message,
  });
}

export default globalErrorHandler;
