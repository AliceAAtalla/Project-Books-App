import React, { useEffect, useReducer, useRef, useState } from 'react';
import { searchBooks } from '../service/api';
import { reducer, initialState } from '../reducer';

const ListBooks = () => {
  const [loading, setLoading] = useState(true);
  // const [total, setTotal] = useState(true);
  // const [data, setData] = useState([]);
  // const [loadMore, setLoadMore] = useState([]);
  // const [startIndex, setStartIndex] = useState(0);
  // const [searchTerm, setSearchTerm] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);

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

  useEffect(() => {
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

  // const books = state.searchTerm === '' ? state.loadMore : state.data;

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {state.data.map((book) =>
        book.volumeInfo.imageLinks ? (
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
        ) : null
      )}
      <button type="button" onClick={handleLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default ListBooks;
