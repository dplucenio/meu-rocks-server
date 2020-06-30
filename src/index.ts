import express from 'express';
import dotenv from 'dotenv';
import {createSQLConnection} from './database';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

createSQLConnection().then(() => {
  app.listen(
    process.env.PORT,
    () => console.log(`meu-rocks-server listening on port ${process.env.PORT}`)
  );
});