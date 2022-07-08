import React, { useContext, useEffect, useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { UserStore } from '../user/userStore';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Loading from './Loading';
import { saveAs } from 'file-saver';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ORDER':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    default:
      return state;
  }
};
export default function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(UserStore);
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      order: {},
      loadingPay: false,
      successPay: false,
    });
  const params = useParams();
  console.log(params);
  const id = params.id;
  const {
    state: { userInfo },
  } = useContext(UserStore);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order.itemsPrice } }],
      })
      .then((orderId) => {
        return orderId;
      });
  };
  const onApprove = (data, actions) => {
    actions.order.capture().then(async (details) => {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        alert('order is paid');
        localStorage.setItem('cartItems', []);
        //localStorage.removeItem('paymentMethod');
        ctxDispatch({ type: 'CART_CLEAR' });
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: err.message });
      }
    });
  };
  const onError = (err) => {
    console.log(err.message);
  };
  useEffect(() => {
    const fetchOrder = async () => {
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      dispatch({ type: 'FETCH_ORDER' });
      try {
        const { data } = await axios.get(`/api/orders/order/${id}`, {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchOrder();

    const loadPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/keys/paypal', {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      paypalDispatch({
        type: 'resetOptions',
        value: { 'client-id': clientId, currency: 'USD' },
      });
      paypalDispatch({
        type: 'setLoadingStatus',
        value: 'pending',
      });
    };
    loadPayPalScript();
  }, [id, userInfo, paypalDispatch, successPay]);
  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <Container>
      <h1 className="mt-3">سفارش {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {order.orderItems.map((item) => (
              <ListGroup.Item key={item.slug}>
                <Row>
                  <Col>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="place-order-screen-img"
                    />
                  </Col>
                  <Col>
                    <Row>
                      <Col className="text-muted"> نام کتاب: {item.name}</Col>
                    </Row>
                    <Row>
                      <Col className="text-muted">نویسنده : {item.author}</Col>
                    </Row>
                    <Row>
                      <Col className="text-muted">ناشر : {item.publisher}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col className="text-primary">قیمت : {item.price}</Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <button
                          className={`btn btn-primary ${
                            order.isPaid ? 'active' : 'disabled'
                          }`}
                          onClick={() => {
                            saveAs(item.downloadLink, `${item.name}.pdf`);
                          }}
                        >
                          دانلود کتاب {item.name}
                        </button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>جمع کل : {order.itemsPrice}</ListGroup.Item>
            <ListGroup.Item>روش پرداختی : {order.paymentMethod}</ListGroup.Item>
            <ListGroup.Item>
              وضعیت :{' '}
              {order.isPaid ? `سفارش پرداخت شده ` : `سفارش هنوز پرداخت نشده`}
            </ListGroup.Item>
            <ListGroup.Item>
              {!order.isPaid && (
                <div>
                  {isPending ? (
                    <Loading />
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  )}
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Alert className="mt-3" variant={order.isPaid ? 'success' : 'danger'}>
        {order.isPaid
          ? 'این سفارش پرداخت شده است.'
          : 'این سفارش هنوز پرداخت نشده است.'}
      </Alert>
    </Container>
  );
}
