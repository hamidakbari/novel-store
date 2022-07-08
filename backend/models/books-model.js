import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    name: { type: String, requried: true },
    author: { type: String, requried: true },
    slug: { type: String, requried: true, unique: true },
    summary: { type: String, requried: true },
    about: { type: String, requried: true },
    publisher: { type: String, requried: true },
    price: { type: String, requried: true },
    pages: { type: String, requried: true },
    numberOfEditions: { type: String, requried: true },
    numReviews: { type: Number, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    likes: { type: Number, required: true },
    comments: [{ type: String, required: true }],
    downloadLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model('Book', bookSchema);
