import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as dotenv from 'dotenv';
import userRouter from './routes/user.route';
import photoRouter from './routes/photo.route';

const app = express();
dotenv.config();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);
app.use('/photos', photoRouter);

const startConn = async (): Promise<void> => {
  try {
    await createConnection();
    console.log('DB started working...');
  } catch (err) {
    console.log('We have Error...', err);
  }
};

startConn()
  .then((): void => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
  })
  .catch((err): void => {
    console.log(err);
  });
