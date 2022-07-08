import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, selectAllBooks } from './booksSlice';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Book from './Book';
import Container from 'react-bootstrap/Container';
export default function BooksList() {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  console.log(books);
  const bookStatus = useSelector((state) => state.books.status);
  console.log(bookStatus);
  const bookError = useSelector((state) => state.books.error);
  useEffect(() => {
    if (bookStatus === 'idle') {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);
  let content;
  if (bookStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (bookStatus === 'error') {
    content = <div>{bookError}</div>;
  } else if (bookStatus === 'succeed') {
    content = (
      <Row>
        {books.map((book) => (
          <Col lg={3} md={4} sm={6} key={book.slug}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
    );
  }
  return (
    <Container>
      <h2 className="mt-3">کتاب ها</h2>
      {content}
    </Container>
  );
}
