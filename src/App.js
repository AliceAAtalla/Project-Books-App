import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as Page from './pages';
import './App.css';
import Header from './components/SearchBar';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Page.ListBooks} />
        <Route path="/book/:bookId" component={Page.DetailsBook} />
        <Route path="/:searchParams" component={Page.ListBooks} />
        <Route path="*" component={Page.NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
