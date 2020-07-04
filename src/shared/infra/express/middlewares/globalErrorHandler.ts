import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

function globalErrorHandler(err: Error, request: Request, response: Response, _: NextFunction) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message
    });
  }
  console.log(err);
  return response.status(500).json({
    status: 500,
    message: err.message
  });
}

export default globalErrorHandler;