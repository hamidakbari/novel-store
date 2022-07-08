import { useContext, useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { UserStore } from '../user/userStore';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function OrderScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(UserStore);
  const { cartItems, userInfo, paymentMethod } = state;
  const [paymentMethodName, setPaymentMethodName] = useState('PayPal');
  const convertNumbers2English = (str) =>
    Number(
      str.replace(
        /([٠١٢٣٤٥٦٧٨٩])|([۰۱۲۳۴۵۶۷۸۹])/g,
        (m, $1, $2) => m.charCodeAt(0) - ($1 ? 1632 : 1776)
      )
    );
  console.log(cartItems);
  console.log(
    cartItems.map((item) => convertNumbers2English(item.price.split(' ')[0]))
  );

  const totalPrice = cartItems.reduce(
    (a, c) => a + convertNumbers2English(c.price.split(' ')[0]),
    0
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin');
    }
  });
  const removeHandler = (id) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: { id: id } });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    console.log({ paymentMethodName });
    const { data } = await axios.post(
      '/api/orders/',
      {
        orderItems: cartItems,
        paymentMethod: paymentMethodName,
        itemsPrice: totalPrice,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    navigate(`/orders/${data.order._id}`);
    // ctxDispatch({ type: 'CART_CLEAR' });
    // ctxDispatch({ type: 'PAYMENT_METHOD_CLEAR' });
    // localStorage.removeItem('cartItems');
    // localStorage.removeItem('paymentMethod');
  };
  return (
    <Container className="mt-4">
      <ListGroup variant="flush">
        {cartItems.map((item) => (
          <ListGroup.Item key={item.slug}>
            <Row>
              <Col md={3}>
                <img src={item.image} alt={item.name} className="order-img" />
              </Col>
              <Col md={5} className="mx-3">
                <h4 className="text-secondary">کتاب {item.name}</h4>
                <h5 className="text-muted">اثر {item.author}</h5>
              </Col>
              <Col md={2}>
                <p>
                  <strong>{item.price}</strong>
                </p>
                <span className="mx-4" onClick={() => removeHandler(item._id)}>
                  <i className="fa fa-trash"></i>
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
      <h4>
        جمع کل: <span className="float-start">{totalPrice}</span>
      </h4>
      <h3 className="mt-5">روش پرداختی:</h3>
      <Form onSubmit={submitHandler}>
        <div
          className="my-3"
          style={{ border: '2px solid #5060aa', padding: '0.5rem' }}
        >
          <Form.Check
            type="radio"
            id="PayPal"
            label="PayPal"
            value={'PayPal'}
            checked={paymentMethodName === 'PayPal'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
            className="text-muted"
          ></Form.Check>
        </div>
        <div
          className="mb-3"
          style={{ border: '2px solid #5060aa', padding: '0.5rem' }}
        >
          <Form.Check
            type="radio"
            id="Stripe"
            label="Stripe"
            value={'Stripe'}
            checked={paymentMethodName === 'Stripe'}
            onChange={(e) => setPaymentMethodName(e.target.value)}
            className="text-muted"
          ></Form.Check>
        </div>
        <Button type="submit" className="mb-3" variant="success">
          رفتن به درگاه پرداخت
        </Button>
      </Form>
    </Container>
  );
}
