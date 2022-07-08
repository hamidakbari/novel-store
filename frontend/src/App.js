import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from 'react-router-dom';
import BookScreen from './app/features/books/BookScreen';
import BooksList from './app/features/books/BooksList';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SignInScreen from './app/features/user/SignInScreen';
import UsersList from './app/features/users/UsersList';
import SignUpScreen from './app/features/user/SignUpScreen';
import { useContext } from 'react';
import { UserStore } from './app/features/user/userStore';
import FavouriteBooksScreen from './app/features/books/FavouriteBooksScreen';
import CommentScreen from './app/features/books/CommentScreen';
import OrderScreen from './app/features/books/OrderScreen';
import Badge from 'react-bootstrap/Badge';
import PlaceOrderScreen from './app/features/books/PlaceOrderScreen';
function App() {
  const { state, dispatch: ctxDispatch } = useContext(UserStore);

  const { userInfo, cartItems } = state;
  // const navigate = useNavigate();
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.setItem('userInfo', null);
    localStorage.setItem('cartItems', []);
    localStorage.setItem('paymentMethod', '');
  };
  return (
    <BrowserRouter>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-white brand">
              رمان استور
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/orders" className="mx-3">
                <span className="text-white">
                  <i className="fa fa-shopping-cart">
                    {cartItems.length > 0 && (
                      <Badge bg="danger">{cartItems.length}</Badge>
                    )}
                  </i>
                </span>
              </Nav.Link>

              {userInfo ? (
                <NavDropdown
                  className="dropleft"
                  title={userInfo.name}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: 'none', color: '#202020' }}
                      to="/favourites"
                    >
                      {' '}
                      Favourite Books
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler} href="#signout">
                    Signout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/signin" className="text-white">
                  <span>
                    <i className="fa-regular fa-user"></i>
                  </span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path={'/'} element={<BooksList />} />
        <Route path={'/books/book/:slug'} element={<BookScreen />} />
        {!userInfo && <Route path={'/signin'} element={<SignInScreen />} />}
        {userInfo && <Route path={'/users'} element={<UsersList />} />}
        {!userInfo && <Route path={'/signup'} element={<SignUpScreen />} />}
        {userInfo && (
          <Route path="/favourites" element={<FavouriteBooksScreen />} />
        )}
        {userInfo && (
          <Route path="/book/:slug/comments" element={<CommentScreen />} />
        )}
        {userInfo && <Route path="/orders" element={<OrderScreen />} />}
        {userInfo && (
          <Route path="/orders/:id" element={<PlaceOrderScreen />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
