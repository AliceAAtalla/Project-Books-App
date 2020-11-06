import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BooksProvider from './context/BooksProvider';
import './styles/reset.css';
import './styles/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
