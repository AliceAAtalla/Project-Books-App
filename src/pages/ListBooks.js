import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import BooksContext from '../context/BooksContext';
import { searchBooks } from '../service/api';

const ListBooks = () => {
  const { state, dispatch } = useContext(BooksContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        console.log('FETCHING_INITIAL');
        const { items, totalItems } = await searchBooks(state.startIndex, state.searchTerm);
        dispatch({ type: 'FETCHING_INITIAL', data: items, total: totalItems });
        setLoading(false);
      } catch (err) {
        console.error('Algo deu errado', err);
      }
    })();
  }, []);

  const isInitialMount = useRef(false);

  useUpdateEffect(() => {
    if (!isInitialMount.current) {
      isInitialMount.current = true;
    } else {
      (async () => {
        try {
          console.log('FETCHING_SEARCH');
          const { items, totalItems } = await searchBooks(state.startIndex, state.searchTerm);
          dispatch({ type: 'FETCHING_SEARCH', data: items, total: totalItems });
        } catch (err) {
          console.error('Algo deu errado', err);
        }
      })();
    }
  }, [state.searchTerm]);

  useEffect(() => {
    if (!isInitialMount.current) {
      isInitialMount.current = true;
    } else {
      (async () => {
        try {
          console.log('LOAD_MORE');
          const { items } = await searchBooks(state.startIndex, state.searchTerm);
          dispatch({ type: 'LOAD_MORE', books: items });
        } catch (err) {
          console.error('Algo deu errado', err);
        }
      })();
    }
  }, [state.startIndex]);

  const handleLoadMore = () => {
    return dispatch({ type: 'START_INDEX' });
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {state.data.map((book) =>
        book.volumeInfo.imageLinks ? (
          <Link to={`/book/${book.id}`}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          </Link>
        ) : null
      )}
      <button type="button" onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default ListBooks;
