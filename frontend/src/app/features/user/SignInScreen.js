import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserStore } from './userStore';
const SignInScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(UserStore);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      setEmail('');
      setPassword('');
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate('/');
    } catch (err) {
      console.log({ errorMessage: err.message });
    }
  };
  return (
    <Container>
      <h1>فرم ورود</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3">
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
};

export default SignInScreen;
