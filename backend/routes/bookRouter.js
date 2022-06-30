import express from 'express';
import { Book } from '../models/books-model.js';

const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
  const books = await Book.find({});
  res.send(books);
});
export default bookRouter;
