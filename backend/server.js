import mongoose from 'mongoose';
import express, { urlencoded } from 'express';
import bookRouter from './routes/bookRouter.js';
import seedRouter from './routes/seedRouter.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import orderRouter from './routes/orderRouter.js';
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.use('/api/seed', seedRouter);
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use((err, req, res, next) => {
  res.send(err.message);
  next();
});
app.listen(5000);
