import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchBooks } from '../service/api';

const ListBooks = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(true);
  const [data, setData] = useState([]);
  const [loadMore, setLoadMore] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const { searchParams } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { items, totalItems } = await searchBooks();
        setData(items);
        setTotal(totalItems);
        setLoading(false);
      } catch (err) {
        console.error('Algo deu errado', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { items } = await searchBooks(searchParams, startIndex);
        setLoadMore([...loadMore, ...items]);
      } catch (err) {
        console.error('Algo deu errado', err);
      }
    })();
  }, [setStartIndex, searchParams, startIndex]);

  const handleLoadMore = () => {
    if (total === startIndex) return null;

    return setStartIndex((prevState) => prevState + 21);
  };

  const books = loadMore.length > 1 ? loadMore : data;

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {books.map((book) =>
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
