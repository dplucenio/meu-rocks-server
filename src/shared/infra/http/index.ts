import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import { createSQLConnection } from '../typeorm';
import router from './routes';
import AppError from '@shared/errors/AppError';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
});

createSQLConnection().then(() => {
  app.listen(
    process.env.PORT,
    () => console.log(`meu-rocks-server listening on port ${process.env.PORT}`)
  );
});