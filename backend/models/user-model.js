import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    favouriteBooks: [
      { type: mongoose.Types.ObjectId, required: true, ref: 'Book' },
    ],
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model('User', userSchema);
