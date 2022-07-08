import express from 'express';
import { Book } from '../models/books-model.js';
import { isAuth } from '../utils.js';
import { User } from '../models/user-model.js';
const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
  const books = await Book.find({});
  res.send(books);
});
bookRouter.put('/book/:slug/like', isAuth, async (req, res) => {
  const { likes } = req.body;

  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (book) {
      const user = await User.findById(req.user._id);
      console.log(req.user._id);
      if (user) {
        if (!user.favouriteBooks.includes(book._id)) {
          console.log(req.user);
          book.likes = likes + 1;
          user.favouriteBooks.push(book._id);
          await book.save();
          await user.save();
          res.send({ user, book });
        }
      } else {
        return res.status(422).send({ message: 'User Not Found!' });
      }
    } else {
      return res.status(422).send({ message: 'Book Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Internal Error in like the book' });
  }
});

bookRouter.put('/book/:id/comment', isAuth, async (req, res) => {
  let { comment } = req.body;
  console.log(comment);
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      comment = req.user.name + '   ' + comment;
      book.comments.push(comment);
      await book.save();
      res.status(200).send(book.comments);
    } else {
      res.status(422).send('Book Not Found!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

bookRouter.put('/book/:id/rating', isAuth, async (req, res) => {
  const { rating } = req.body;

  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      book.rating =
        (book.rating * book.numReviews + rating) / (book.numReviews + 1);
      book.numReviews = book.numReviews + 1;
      await book.save();
      console.log(book.rating, book.numReviews);
      res.send(book);
    } else {
      res.status(422).send('Book Not Found!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
bookRouter.get('/book/:slug/comments', isAuth, async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (book) {
      res.status(200).send(book.comments);
    } else {
      res.status(422).send('Book Not Found!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default bookRouter;
