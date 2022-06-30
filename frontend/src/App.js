import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookScreen from './app/features/books/BookScreen';
import BooksList from './app/features/books/BooksList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<BooksList />} />
        <Route path={'/books/book/:slug'} element={<BookScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
