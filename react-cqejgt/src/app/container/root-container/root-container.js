import React from 'react';
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Booklist from '../../components/Booklist'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Detailpage from '../../components/Detailpage';

const RootContainer = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const rBooks = await fetchBooks()
      setBooks(rBooks)
    }
    getBooks()
  }, [])

  const fetchBooks = async () => {
    const res = await fetch('https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books')
    return await res.json()
  }


  return (
    <BrowserRouter>
      <Container>
        <h1>ti&m Library</h1>
        <Switch>
          <Route path="/book/:id">
            <Detailpage/>
          </Route>
          <Route exact path="/">
            <Booklist books={books}/>
          </Route>
        </Switch>
      </Container>
    </BrowserRouter>
  );
  
}

export default RootContainer;
