import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/esm/Card'
import { useParams } from 'react-router'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Detailpage(props) {
    const [detail, setDetail] = useState([])
    const {id} = useParams();

  useEffect(() => {
    const getBook = async () => {
      const rBook = await fetchBook()
      setDetail(rBook)
    }
    getBook()
  }, [])

  const fetchBook = async () => {
    const res = await fetch('https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books/'+id)
    return await res.json()
  }

    
    return (
        <Card>
            <Card.Header>
                <Link to="/"><Button className="backButton">{'<'}</Button></Link>
                <span className="detailHeader">Details</span>
            </Card.Header>
            <Container>
            <Row>
                    <Col className="detailLabel" lg={2} xs={12}>Titel:</Col>
                    <Col>{detail.title}</Col>
                </Row>
                <Row>
                    <Col className="detailLabel" lg={2} xs={12}>Autor:</Col>
                    <Col>{detail.author}</Col>
                </Row>
                <Row>
                    <Col className="detailLabel" lg={2} xs={12}>Anzahl Exemplare:</Col>
                    <Col>{detail.total_amount}</Col>
                </Row>
                <Row>
                    <Col className="detailLabel" lg={2} xs={12}>Anzahl Seiten:</Col>
                    <Col>{detail.pages}</Col>
                </Row>
                <Row>
                    <Col className="detailLabel" lg={2} xs={12}>ISBN:</Col>
                    <Col>{detail.isbn}</Col>
                </Row>
            </Container>
        </Card>
    )
}

Detailpage.propTypes = {

}

export default Detailpage

