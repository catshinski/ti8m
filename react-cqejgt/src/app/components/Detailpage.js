import React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useParams, useRouteMatch } from 'react-router'
import DetailHeader from './DetaiHeader'
import DetailRow from './DetailRow'
import Card from 'react-bootstrap/esm/Card'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Detailpage(props) {
    const [detail, setDetail] = useState([])
    const [tmpDetail, setTmpDetail] = useState([])
    const [edit, setEdit] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const {id} = useParams();
    const route = useRouteMatch();

  useEffect(() => {
    const getBook = async () => {
      if(route.path === '/book/:id'){
        const rBook = await fetchBook()
        setDetail(rBook)
      }
      if(route.path === '/addbook'){
          toggleEditMode()
          
      }
    }
    getBook()
  }, [])

  const fetchBook = async () => {
    const res = await fetch(props.api+'/'+id)
    return await res.json()
  }

  const toggleEditMode = () => {
      setEdit(!edit)
      setTmpDetail(detail)
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const method = route.path === '/addbook' ? 'POST' : 'PUT'
    const link = route.path === '/book/:id' ? '/'+id : ''
    const result = await fetch(props.api+link, {
        method: method,
        headers : {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(tmpDetail),
    })
    setDetail(await result.json())
    if(route.path === '/addbook'){
        setRedirect(true)
    }else{
        toggleEditMode()
    }
    
  }

  const deleteBook = async (e) => {
    if(window.confirm('Möchten Sie dieses Buch wirklich löschen?')){
        const result = await fetch(props.api+'/'+id, {
            method: 'DELETE'
        })
        result.status === 200 ? setRedirect(true) : alert('Fehler: Konnte Buch nicht löschen!')
    }
  }

    
    return (
        <Card>
            <Card.Header>
                <DetailHeader edit={edit} toggleEditMode={toggleEditMode}></DetailHeader>
            </Card.Header>
            <Container className="detailContent">
                <Form onSubmit={submitForm}>
                    <DetailRow label='Titel:' value={tmpDetail.title} type='text'
                        onChange={(e) => setTmpDetail({...tmpDetail, title: e.target.value})} 
                        edit={edit} display={detail.title} />
                    <DetailRow label='Autor:' value={tmpDetail.author} type='text'
                        onChange={(e) => setTmpDetail({...tmpDetail, author: e.target.value})} 
                        edit={edit} display={detail.author} />
                    <DetailRow label='Anzahl Exemplare:' value={tmpDetail.total_amount} type='number'
                        onChange={(e) => setTmpDetail({...tmpDetail, total_amount: e.target.value})} 
                        edit={edit} display={detail.total_amount} />
                    <DetailRow label='Anzahl Seiten:' value={tmpDetail.pages} type='number'
                        onChange={(e) => setTmpDetail({...tmpDetail, pages: e.target.value})} 
                        edit={edit} display={detail.pages} />
                    <DetailRow label='ISBN:' value={tmpDetail.isbn} type='number'
                        onChange={(e) => setTmpDetail({...tmpDetail, isbn: e.target.value})} 
                        edit={edit} display={detail.isbn} />
                    
                    {edit 
                    ? <Button type="submit" className="submitButton" >Speichern</Button> 
                    :  <Button variant="outline-danger" className="submitButton" onClick={deleteBook}>Buch löschen</Button>}
                </Form>
            </Container>
            {redirect && <Redirect to='/'/>}
        </Card>
    )
}

Detailpage.propTypes = {
    api: PropTypes.string,
}

export default Detailpage

