import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

import { createConnection as createSQLConnection} from 'typeorm';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';

dotenv.config();

createSQLConnection().then(() => {

  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(globalErrorHandler);

  app.listen(
    process.env.PORT,
    () => console.log(`meu-rocks-server listening on port ${process.env.PORT}`)
  );

});