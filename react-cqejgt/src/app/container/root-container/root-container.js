import React from 'react';
import Container from 'react-bootstrap/Container'
import Booklist from '../../components/Booklist'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Detailpage from '../../components/Detailpage';

const RootContainer = () => {
  const api = 'https://5c6eb0534fa1c9001424240b.mockapi.io/api/v1/books';

  return (
    <BrowserRouter>
        <h1>ti&m Library</h1>
        <Switch>
          <Route path="/book/:id">
            <Detailpage api={api}/>
          </Route>
          <Route path="/addbook">
            <Detailpage api={api}/>
          </Route>
          <Route exact path="/">
            <Booklist api={api}/>
          </Route>
        </Switch>
    </BrowserRouter>
  );
  
}

export default RootContainer;
