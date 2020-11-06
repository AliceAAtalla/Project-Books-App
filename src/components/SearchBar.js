import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BooksContext from '../context/BooksContext';

const Header = () => {
  const [term, setTerm] = useState('');
  const { state, dispatch } = useContext(BooksContext);
  const history = useHistory();

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setTerm(value);
  };

  const goToHome = () => {
    history.push('/');
  };

  const handleSearchButtom = (event) => {
    event.preventDefault();
    console.log(state);
    dispatch({ type: 'SEARCH_TERM', searchTerm: term, startIndex: 0, fetchingSearch: true });
  };

  return (
    <div className="container">
      <button type="button" className="btn-icons" onClick={goToHome}>
        <img
          className="search-icon"
          src="https://img.icons8.com/material-sharp/48/000000/home.png"
          alt="home icon"
        />
      </button>
      <input className="input-search" type="text" id="searchText" onChange={handleSearchInput} />
      <div>
        <button className="btn-icons" type="button" onClick={handleSearchButtom}>
          <Link to={`/${term}`}>
            <img
              className="search-icon"
              src="https://img.icons8.com/android/24/000000/search.png"
              alt="search"
            />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
