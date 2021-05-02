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
import Form from 'react-bootstrap/Form'

function Detailpage(props) {
    const [detail, setDetail] = useState([])
    const [tmpDetail, setTmpDetail] = useState([])
    const [edit, setEdit] = useState(false)
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

  const toggleEditMode = () => {
      setEdit(!edit)
      setTmpDetail(detail)
  }

  const submitForm = async (e) => {
      e.preventDefault()
    const result = await fetch('https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books/'+id, {
        method: 'PUT',
        headers : {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(tmpDetail),
    })
    setDetail(await result.json())
    toggleEditMode()
  }

    
    return (
        <Card>
            <Card.Header>
                <Link to="/"><Button className="headerButton">{'<'}</Button></Link>
                <span className="detailHeader">Details</span>
                <Button className="float-right headerButton" variant="outline-secondary" 
                    onClick={toggleEditMode}>{edit ? 'Abbrechen' : 'Bearbeiten'}</Button>
            </Card.Header>
            <Container className="detailContent">
                <Form onSubmit={submitForm}>
                    <Row>
                        <Col className="detailLabel" lg={2} xs={12}>Titel:</Col>
                        <Col>
                            { edit 
                            ? <Form.Control type="text" value={tmpDetail.title} 
                                onChange={(e) => setTmpDetail({...tmpDetail, title: e.target.value})}></Form.Control> 
                            : detail.title }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="detailLabel" lg={2} xs={12}>Autor:</Col>
                        <Col>
                            { edit 
                            ? <Form.Control type="text" value={tmpDetail.author}
                                onChange={(e) => setTmpDetail({...tmpDetail, author: e.target.value})}></Form.Control> 
                            : detail.author }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="detailLabel" lg={2} xs={12}>Anzahl Exemplare:</Col>
                        <Col>
                            { edit 
                            ? <Form.Control type="number" value={tmpDetail.total_amount}
                                onChange={(e) => setTmpDetail({...tmpDetail, total_amount: e.target.value})}></Form.Control> 
                            : detail.total_amount }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="detailLabel" lg={2} xs={12}>Anzahl Seiten:</Col>
                        <Col>
                            { edit 
                            ? <Form.Control type="number" value={tmpDetail.pages}
                                onChange={(e) => setTmpDetail({...tmpDetail, pages: e.target.value})}></Form.Control> 
                            : detail.pages }
                        </Col>
                    </Row>
                    <Row>
                        <Col className="detailLabel" lg={2} xs={12}>ISBN:</Col>
                        <Col>
                            { edit 
                            ? <Form.Control type="number" value={tmpDetail.isbn}
                                onChange={(e) => setTmpDetail({...tmpDetail, isbn: e.target.value})}></Form.Control> 
                            : detail.isbn }
                        </Col>
                    </Row>
                    {edit && <Button type="submit" className="submitButton" >Speichern</Button>}
                </Form>
            </Container>
        </Card>
    )
}

Detailpage.propTypes = {

}

export default Detailpage

