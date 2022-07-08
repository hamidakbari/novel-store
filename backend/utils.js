import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      favouriteBooks: user.favouriteBooks,
    },
    process.env.SECRET,
    { expiresIn: '5d' }
  );
};
export const isAuth = (req, res, next) => {
  jwt.verify(
    req.headers.authorization.split(' ')[1],
    process.env.SECRET,
    (err, decode) => {
      if (err) {
        console.log(err.message);
        res.status(404).send('User Not Authorized');
        return next(err);
      }
      req.user = decode;
      next();
    }
  );
};
