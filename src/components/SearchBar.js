import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksContext from '../context/BooksContext';

const Header = () => {
  const [term, setTerm] = useState('');
  const { state, dispatch } = useContext(BooksContext);

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setTerm(value);
  };

  const handleSearchButtom = (event) => {
    event.preventDefault();
    console.log(state);
    dispatch({ type: 'SEARCH_TERM', searchTerm: term, startIndex: 0, fetchingSearch: true });
  };

  return (
    <div className="container">
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
