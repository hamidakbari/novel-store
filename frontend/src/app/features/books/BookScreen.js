import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllBooks } from './booksSlice';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
const BookScreen = () => {
  const bookSlug = useParams().slug;
  const books = useSelector(selectAllBooks);
  const book = books.find((mybook) => mybook.slug === bookSlug);

  return (
    <Container className="mt-3">
      <Row style={{ flexDirection: 'row-reverse' }}>
        <Col md={4}>
          <img src={book.image} alt={book.name} className="img-book mx-3" />
        </Col>
        <Col md={4} style={{ display: 'flex', flexDirection: 'column' }}>
          <Row
            style={{
              flexWrap: 'wrap',
              alignSelf: 'self-end',
            }}
          >
            <Col md={12}>
              <p>
                <strong>کتاب {book.name}</strong>
              </p>
            </Col>
          </Row>
          <Row
            style={{
              flexWrap: 'no-wrap',
              alignSelf: 'self-end',
            }}
          >
            <Col md={12}>
              <p>نویسنده: {book.author}</p>
            </Col>
          </Row>
          <Row
            style={{
              flexWrap: 'no-wrap',
              alignSelf: 'self-end',
            }}
          >
            <Col md={12} style={{ flexWrap: 'no-wrap', alignSelf: 'self-end' }}>
              <p style={{ float: 'right' }}>
                نسخه الکترونیک <strong>کتاب {book.name} </strong>
                به همراه هزاران کتاب دیگر از طریق اپلیکیشن رایگان فیدیبو در
                دسترس است
              </p>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Row className="text-center">
                <strong>{book.price}</strong>
              </Row>
              <Row>
                <button className="d-block my-3 btn btn-outline-info">
                  درباره کتاب
                </button>
              </Row>
              <Row>
                <button className="d-block mb-3 btn btn-outline-info">
                  دانلود رایگان کتاب
                </button>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default BookScreen;
