import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllBooks, userLike, userRate, userComment } from './booksSlice';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useContext, useState, useRef } from 'react';
import { UserStore } from '../user/userStore';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

const BookScreen = () => {
  const inputElement = useRef();
  const { state, dispatch: ctxDispatch } = useContext(UserStore);
  const { userInfo, cartItems } = state;
  const [bookRating, setBookRating] = useState(0);
  const [color1Rating, setColor1Rating] = useState();
  const [color2Rating, setColor2Rating] = useState();
  const [color3Rating, setColor3Rating] = useState();
  const [color4Rating, setColor4Rating] = useState();
  const [color5Rating, setColor5Rating] = useState();
  const [comment, setComment] = useState();
  const bookSlug = useParams().slug;
  const books = useSelector(selectAllBooks);
  const book = books.find((mybook) => mybook.slug === bookSlug);
  const dispatch = useDispatch();
  const otherBooks = books.filter((mybook) => mybook.slug !== bookSlug);
  const navigate = useNavigate();
  const focusInput = () => {
    inputElement.current.focus();
  };

  const likeHandler = async () => {
    if (!userInfo) {
      return alert(`باید اول با نام کاربری خود وارد کنید.
      
      `);
    }
    if (userInfo.favouriteBooks.includes(book._id)) {
      return alert('شما قبلا این موزیک را لایک کردید.');
    }
    try {
      const { data } = await axios.put(
        `/api/books/book/${book.slug}/like`,
        { likes: book.likes },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(data);
      ctxDispatch({ type: 'USER_LIKE', payload: book._id });
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          ...userInfo,
          favouriteBooks: data.user.favouriteBooks,
        })
      );
      dispatch(userLike({ id: book._id }));
    } catch (err) {
      console.log({ message: err.message });
    }
  };

  const rating1Handler = () => {
    if (bookSlug === book.slug) {
      setColor1Rating('#ffcc00');
      setBookRating(1);
    }
  };
  const rating2Handler = () => {
    if (bookSlug === book.slug) {
      setColor1Rating('#ffcc00');
      setColor2Rating('#ffcc00');
      setBookRating(2);
    }
  };
  const rating3Handler = () => {
    if (bookSlug === book.slug) {
      setColor1Rating('#ffcc00');
      setColor2Rating('#ffcc00');
      setColor3Rating('#ffcc00');
      setBookRating(3);
    }
  };
  const rating4Handler = () => {
    if (bookSlug === book.slug) {
      setColor1Rating('#ffcc00');
      setColor2Rating('#ffcc00');
      setColor3Rating('#ffcc00');
      setColor4Rating('#ffcc00');
      setBookRating(4);
    }
  };
  const rating5Handler = () => {
    if (bookSlug === book.slug) {
      setColor1Rating('#ffcc00');
      setColor2Rating('#ffcc00');
      setColor3Rating('#ffcc00');
      setColor4Rating('#ffcc00');
      setColor5Rating('#ffcc00');
      setBookRating(5);
    }
  };
  const submitRatingHandler = async () => {
    if (!userInfo) {
      return alert('شما بایستی ابتدا ثبت نام کنید.');
    }
    dispatch(userRate({ id: book._id, rating: bookRating }));
    const { data } = await axios.put(
      `/api/books/book/${book._id}/rating`,
      {
        rating: bookRating,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    alert(`امتیاز داده شما به کتاب ${book.name} ${bookRating} از 5 است.`);
    setColor1Rating('');
    setColor2Rating('');
    setColor3Rating('');
    setColor4Rating('');
    setColor5Rating('');
    setBookRating(0);
  };
  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      return alert('شما ابتدا بایستی ثبت نام کنید.');
    }
    const { data } = await axios.put(
      `/api/books/book/${book._id}/comment`,
      { comment },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(userComment({ id: book._id, comment: comment }));
    console.log(data);
  };

  const sellHandler = () => {
    if (!userInfo) {
      return alert('شما بایستی ابتدا ثبت نام کنید.');
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: book });

    navigate('/orders');
  };

  return (
    <Container className="mt-3 mx-3">
      <Row className="d-flex justify-content-between">
        <Col>
          <img src={book.image} alt={book.name} className="img-book" />
        </Col>
        <Col className="d-flex flex-column">
          <h3>کتاب های تازه منتشر شده</h3>
          <hr />
          <ListGroup variant="flush">
            {otherBooks.map((otherBook) => (
              <ListGroup.Item key={otherBook.slug}>
                <Row>
                  <Col md={6}>
                    <Link to={`/books/book/${otherBook.slug}`}>
                      <img
                        src={otherBook.image}
                        alt={otherBook.name}
                        className="other-book-img"
                      />
                    </Link>
                  </Col>

                  <Col md={6}>
                    <Row className="mb-2">
                      <Col>{otherBook.name}</Col>
                    </Row>
                    <Row>
                      <Col>
                        <Rating rating={otherBook.rating} />
                        {'  '}({otherBook.rating.toFixed(1)}) {'  '}
                        از {otherBook.numReviews} بازدید
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={8}>
          <Row>
            <Col md={2}>
              <span className="likes">
                {' '}
                {book.likes}
                <i
                  className="fa-regular fa-heart mx-3"
                  onClick={likeHandler}
                ></i>
              </span>
            </Col>
            <Col md={5}>
              {' '}
              <Button size="sm" className="mx-3" onClick={submitRatingHandler}>
                امتیاز خود را وارد کنید.
              </Button>
              <span style={{ fontFamily: 'Times New Roman' }}>
                {bookRating}/5
              </span>{' '}
              <span style={{ color: color5Rating }} onClick={rating5Handler}>
                <i className="fa-regular fa-star"></i>
              </span>
              <span style={{ color: color4Rating }} onClick={rating4Handler}>
                <i className="fa-regular fa-star"></i>
              </span>
              <span style={{ color: color3Rating }} onClick={rating3Handler}>
                <i className="fa-regular fa-star"></i>
              </span>
              <span style={{ color: color2Rating }} onClick={rating2Handler}>
                <i className="fa-regular fa-star"></i>
              </span>
              <span style={{ color: color1Rating }} onClick={rating1Handler}>
                <i className="fa-regular fa-star"></i>
              </span>
            </Col>
            <Col md={5}>
              <Button
                size="sm"
                onClick={() => {
                  navigate(`/book/${book.slug}/comments`);
                }}
              >
                نظرات مربوط به کتاب {book.name}
              </Button>
              <span className="comments" onClick={focusInput}>
                {'  '}
                {book.comments.length}
                {'  '}
                <i className="fa-regular fa-comment"></i>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <h2>درباره کتاب :</h2>
      <p>{book.about}</p>
      <hr />
      <h2> قسمتی از کتاب {book.name}</h2>
      <p>{book.summary}</p>
      <hr />
      <Row>
        <Col md={9}>
          <p>نام کتاب : {book.name}</p>
          <p> نویسنده : {book.author}</p>
          <p>انتشارات : {book.publisher}</p>
          <p>تعداد صفحات : {book.pages}</p>
        </Col>
        <Col md={3}>
          <div>
            <p className="mx-4">قیمت محصول:</p>
            <p className="mx-4 text-primary" style={{ fontWeight: 'bolder' }}>
              {book.price}
            </p>
            <Button onClick={sellHandler}>
              افزودن به سبد خرید{' '}
              <span>
                <i className="fa fa-shopping-cart"></i>
              </span>
            </Button>
          </div>
        </Col>
      </Row>
      <Form onSubmit={commentSubmitHandler}>
        <Form.Group>
          <Form.Label>لطفا نظر خود را وارد کنید:</Form.Label>
          <Form.Control
            as={'textarea'}
            rows={3}
            placeholder={'لطفا نظر خود را وارد کنید.'}
            className="mb-1"
            ref={inputElement}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="mb-3" type="submit">
          ارسال
        </Button>
      </Form>
    </Container>
  );
};
export default BookScreen;
