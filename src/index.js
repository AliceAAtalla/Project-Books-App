import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BooksProvider from './context/BooksProvider';

ReactDOM.render(
  <React.StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
