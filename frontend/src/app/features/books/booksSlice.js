import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  console.log('hello');
  const response = await axios.get('/api/books');
  console.log({ data: response.data });
  return response.data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    status: 'idle',
    error: null,
    books: [],
  },
  reducers: {
    userLike: (state, action) => {
      state.books.find((book) => book._id === action.payload.id).likes += 1;
    },
    userRate: (state, action) => {
      state.books.find((book) => book._id === action.payload.id).rating =
        (state.books.find((book) => book._id === action.payload.id).rating *
          state.books.find((book) => book._id === action.payload.id)
            .numReviews +
          action.payload.rating) /
        (state.books.find((book) => book._id === action.payload.id).numReviews +
          1);
      state.books.find(
        (book) => book._id === action.payload.id
      ).numReviews += 1;
    },
    userComment: (state, action) => {
      state.books
        .find((book) => book._id === action.payload.id)
        .comments.push(action.payload.comment);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, acion) => {
        state.status = 'succeed';
        state.books = state.books.concat(acion.payload);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { userLike, userRate, userComment } = booksSlice.actions;
export default booksSlice.reducer;
export const selectAllBooks = (state) => state.books.books;
