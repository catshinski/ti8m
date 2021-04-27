import React from 'react';
import { useState, useEffect } from 'react'
import { Example } from '../../components';

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
    <>
      <h1>ti&m Library</h1>
      <Example />
      {books.map((book) => (
        <p>{book.title}</p>
      ))}
    </>
  );
  
}

export default RootContainer;
