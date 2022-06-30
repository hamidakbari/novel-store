import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import bookRouter from './routes/bookRouter.js';
import seedRouter from './routes/seedRouter.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use('/api/seed', seedRouter);
app.use('/api/books', bookRouter);

app.use((err, req, res, next) => {
  res.send(err.message);
  next();
});
app.listen(5000);
