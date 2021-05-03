import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

function Booklist(props) {
    const [books, setBooks] = useState([])
    let ticker

  useEffect(() => {
    const getBooks = async () => {
      setBooks(await fetchBooks())
      //Update Booklist all 10 seconds
      ticker = setInterval(async () => {
        setBooks(await fetchBooks())
      }, 10000)
    }
    getBooks()
    return () => {
        clearInterval(ticker);
    }
  }, [])

  const fetchBooks = async () => {
    const res = await fetch(props.api)
    return await res.json()
  }

    return (
        <Card>
            <Card.Header className="mainHeader">
                <span>Bücher</span>
                <Link to="/addbook">
                    <Button className="float-right headerButton" variant="success">Hinzufügen</Button>
                </Link>
            </Card.Header>
            <ListGroup>
                {books.map((book) => (
                    <Link key={book.id} to={"/book/"+book.id} className="booklistItem">
                        <ListGroup.Item action >
                            {book.title}
                        </ListGroup.Item>
                    </Link>
                ))}
            </ListGroup>
        </Card>
    )
}

Booklist.propTypes = {
    api: PropTypes.string,
}

export default Booklist

