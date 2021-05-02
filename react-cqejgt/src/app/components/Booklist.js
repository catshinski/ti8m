import React from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'

function Booklist(props) {
    return (
        <Card>
            <Card.Header className="mainHeader">Bücher</Card.Header>
            <ListGroup>
                {props.books.map((book) => (
                    <Link key={book.id} to={"/book/"+book.id} className="booklistItem">
                        <ListGroup.Item action >{book.title}</ListGroup.Item>
                    </Link>
                ))}
            </ListGroup>
        </Card>
    )
}

Booklist.propTypes = {
    
}

export default Booklist

