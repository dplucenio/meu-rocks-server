import express from 'express';
import dotenv from 'dotenv';
import studentRouter from './student.router';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/students', studentRouter);

app.get('/', (request, response) => {
  response.json({msg: "I'm alive"});
})

app.listen(
  process.env.PORT,
  () => console.log(`meu-rocks-server listening on port ${process.env.PORT}`)
);