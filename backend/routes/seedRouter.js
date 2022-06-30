import express from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/books-model.js';
import { data } from '../data.js';
const seedRouter = express.Router();
seedRouter.get('/', async (req, res) => {
  await Book.remove({});
  const books = await Book.insertMany(data.books);
  res.send(books);
});
export default seedRouter;
