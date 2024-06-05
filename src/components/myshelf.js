import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BookCard from './book';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);
  const handleLibrary = () => {
    return (
        navigate("/")
    )
  }
  const removeFavourite = (bookToRemove) => {
    const updatedFavorites = favorites.filter(book => book.bookName !== bookToRemove.bookName);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  return (
    <Container fluid="md">
      <div className='contdiv m-2' >
            <Button variant="success" onClick={handleLibrary}>Library</Button>
        </div>
      <Row xs='auto' md={4} className="g-4">
        {favorites.map((book, idx) => (
          <Col key={idx}>
            <BookCard
              buttonname="Remove from myshelf"
              bookName={book.bookName}
              author={book.author}
              cover={book.cover}
              year={book.year}
              ClickFunction= {removeFavourite}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
