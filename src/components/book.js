import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const BookCard = ({ bookName, author, cover, year, ClickFunction, message,buttonname}) => {
  const [clicked,setClicked] = useState(false)
  const handleAdd = () => {
    const favoriteBook = { bookName, author, cover, year };
    if (buttonname=="Add to shelf"){
      setClicked(true)
    }
    ClickFunction(favoriteBook);
  };

  return (
    <Card className='border-dark' width={171} height={180}>
      <Card.Body>
        <Card.Img variant="top" src={cover} thumbnail="true" />
        <Card.Title>{bookName}</Card.Title>
        <Card.Text>{author}</Card.Text>
        <Card.Text>{year}</Card.Text>
        {message ? (
          <Card.Text className='green'>{message}</Card.Text>
        ) : (
          !clicked && <Button variant="success" onClick={handleAdd}>{buttonname}</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default BookCard;
