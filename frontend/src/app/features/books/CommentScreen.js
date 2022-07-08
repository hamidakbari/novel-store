import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserStore } from '../user/userStore';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function CommentScreen() {
  const { state } = useContext(UserStore);
  const { userInfo } = state;
  const slug = useParams().slug;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const sendRequest = async () => {
      const { data } = await axios.get(`/api/books/book/${slug}/comments`, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      setComments(data);
    };
    sendRequest();
  });
  return (
    <Container>
      <ListGroup variant="flush">
        {comments.map((comment, index) => (
          <ListGroup.Item className="mt-2" key={index}>
            <Card>
              <Card.Body>
                <Card.Title> کاربر: {comment.split('   ')[0]}</Card.Title>
                <Card.Text>{comment.split('   ')[1]}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
