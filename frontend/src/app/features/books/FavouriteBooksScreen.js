import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { UserStore } from '../user/userStore';
import { selectAllBooks } from './booksSlice';
export default function FavouriteBooksScreen() {
  const { state } = useContext(UserStore);
  const { userInfo } = state;
  const books = useSelector(selectAllBooks);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      const { data } = await axios.get(
        `/api/users/user/${userInfo._id}/favourites`,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      for (const book of data.favouriteBooks) {
        const fbook = books.filter((thisbook) => thisbook._id === book);
        if (fbook) {
          setFavouriteBooks((prevBooks) => prevBooks.concat(fbook));
        }
      }
      console.log(userInfo.favouriteBooks);
      console.log(books);
    };
    sendRequest();
  }, [userInfo, books]);

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>نام کتاب</th>
            <th>نویسنده </th>
            <th>ناشر</th>
            <th>امتیاز</th>
          </tr>
        </thead>
        <tbody>
          {favouriteBooks.map((book) => (
            <tr key={book.slug}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.rating.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
