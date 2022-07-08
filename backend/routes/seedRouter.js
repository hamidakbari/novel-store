import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/books-model.js';
import { data } from '../data.js';
import { User } from '../models/user-model.js';
import { Order } from '../models/order-model.js';
const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  await Book.remove({});
  await User.remove({});
  await Order.remove({});
  const books = await Book.insertMany(data.books);
  const users = await User.insertMany(data.users);
  res.send({ books, users });
});
export default seedRouter;
