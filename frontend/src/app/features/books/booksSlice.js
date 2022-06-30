import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('/api/books');
  return response.data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    status: 'idle',
    error: null,
    books: [],
  },
  reducers: {},
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
export default booksSlice.reducer;
export const selectAllBooks = (state) => state.books.books;
