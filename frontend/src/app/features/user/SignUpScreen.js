import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserStore } from './userStore';
export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(UserStore);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Container>
      <h1>فرم ورود</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3">
          <Form.Label>نام کاربری</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام کاربری خود را وارد کنید."
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل خود را وارد کنید."
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>رمز عبور:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="رمز عبور خود را وارد کنید."
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mb-3">
          ورود
        </Button>
      </Form>
      <p>
        اگر اکانت ندارید در <Link to="/signup">اینجا ثبت نام کنید</Link>
      </p>
    </Container>
  );
}
