import express from 'express';
import { User } from '../models/user-model.js';
import { generateToken, isAuth } from '../utils.js';
import cors from 'cors';
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
userRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          favouriteBooks: user.favouriteBooks,
          token: generateToken(user),
        });
      } else {
        res.status(404).send({ message: "email or password doesn't match" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

userRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res.status(404).send('user Exists!');
    }
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      favouriteBooks: [],
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      favouriteBooks: user.favouriteBooks,
      token: generateToken(user),
    });
  } catch (err) {
    return res.status(500).send('error in server during signup');
  }
});

userRouter.get('/user/:id/favourites', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    if (user) {
      res.send(user);
    } else {
      res.status(422).send({ message: 'User Not Found!' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default userRouter;
