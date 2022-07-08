import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Rating from './Rating';
export default function Book({ book }) {
  return (
    <Container className="mt-3">
      <Card>
        <Link to={`/books/book/${book.slug}`}>
          <Card.Img className="card-img-top" variant="top" src={book.image} />
        </Link>
        <Card.Body className="d-flex flex-column justify-content-around">
          <Link
            to={`/books/book/${book.slug}`}
            style={{ textDecoration: 'none', color: '#000000' }}
            className="mb-3"
          >
            <Card.Title>{book.name}</Card.Title>
          </Link>
          <Card.Text>
            <Rating rating={book.rating} />
            {'  '}({book.rating.toFixed(1)}) {'  '}
            از {book.numReviews} بازدید
          </Card.Text>
          <Card.Text className="text-muted">{book.author}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
