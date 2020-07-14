import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import { createConnection as createSQLConnection } from 'typeorm';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';

dotenv.config();

createSQLConnection().then(() => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(globalErrorHandler);

  app.listen(process.env.PORT, () =>
    console.log(`meu-rocks-server listening on port ${process.env.PORT}`),
  );
});
