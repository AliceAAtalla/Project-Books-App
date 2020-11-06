import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { getByIdBook } from '../service/api';
import notFavoritedIcon from '../assets/icons/notFavoritedIcon.png';
import favoritedIcon from '../assets/icons/FavoritedIcon.png';
// import BooksContext from '../context/BooksContext';

const DetailsBook = () => {
  const [data, setData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getByIdBook(bookId);
        console.log(Object.keys(response));
        setData(response);
        setLoading(false);
      } catch (err) {
        console.error('Algo deu errado', err);
      }
    })();
  }, []);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleFavorite = (event) => {
    event.preventDefault();
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p>Loading...</p>;
  return (
    <section className="container-detail">
      <div className="container-main">
        <div className="content-main">
          <img src={data.volumeInfo.imageLinks.thumbnail} alt={data.volumeInfo.title} />
          <span>{data.volumeInfo.pageCount} pages</span>
        </div>
        <div className="content-second">
          <h3>{data.volumeInfo.title}</h3>
          <span>by {data.volumeInfo.authors[0]}</span>
          <ReactStars count={5} onChange={ratingChanged} size={32} color2="#ffd700" />
          <span className="rating">{`Rating: ${rating}`}</span>
          <div className="content-btns">
            <button className="btn-buy" type="button">
              BUY
            </button>
            <button className="btn-icons" type="button" onClick={handleFavorite}>
              <img src={isFavorite ? favoritedIcon : notFavoritedIcon} alt="Heart Icon" />
            </button>
          </div>
        </div>
      </div>
      <article className="resume-article">
        <p>{data.volumeInfo.description}</p>
      </article>
    </section>
  );
};

export default DetailsBook;
