import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import background from '../imgs/background.png';
import BookCard from './book';
import back from '../imgs/back.jpg';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MainContainer() {
    const [book, setBook] = useState("");
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [favorites,setFavorites] = useState([])
    const navigate = useNavigate()
    const handleSearch = (event) => {
        setBook(event.target.value);
    }
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
      }, []);    
    const handleButtonClick = () => {
        console.log("Button clicked");
        navigate("/myshelf")
        // Add functionality for the button if needed
    }
    useEffect(() => {
        if (book.length >= 5) {
            setMessage("");
            const fetchBooks = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`https://openlibrary.org/search.json`, {
                        params: {
                            q:book,
                            fields: "title,author_name,cover_i,publish_year",
                            limit: 10
                        }
                    });
                    setDocs(response.data.docs);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    
                } finally {
                    setLoading(false);
                }
            };
            fetchBooks();
        } else if (book.length > 0) {
            setMessage("Please enter at least 5 characters.");
        } else {
            setMessage("");
            setDocs([]);
        }
    }, [book]);
    const addToFavorites = (favoriteBook) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updatedFavorites = [...favorites, favoriteBook];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        console.log("Added to favorites:", favoriteBook);
    }

    return (
        <div className='maindiv'>
            <Container fluid="md">
            <h1 className='text-center mt-2'>Library</h1>
                <div className='contdiv m-2' >
                    <Button variant="success" onClick={handleButtonClick}>My Book Shelf</Button>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control 
                            type="text" 
                            placeholder="Enter a book name" 
                            onChange={handleSearch} 
                            value={book}
                        />
                    </Form.Group>
                </Form>
                {loading && <Spinner animation="border" role="status">
                </Spinner>}
                {message && <p>{message}</p>}
                <Row xs='auto' md={4} className="g-4">
                    {docs.map((doc, idx) => {
                    const isInShelf = favorites.some(fav => fav.bookName === doc.title);
                    const message = isInShelf ? "Already in the shelf" : "";
                    return (
                <Col key={idx}>
                    <BookCard
                        bookName={doc.title}
                        buttonname="Add to shelf"
                        author={doc.author_name ? doc.author_name.join(', ') : 'Unknown'}
                        cover={doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : back}
                        year={doc.first_publish_year}
                        ClickFunction={!isInShelf && addToFavorites}
                        message={message}
                    />
                </Col>
          );
        })}
      </Row>
                <Image src={background} fluid rounded className='mt-3' />
            </Container>
    </div>
    );
}

export default MainContainer;
