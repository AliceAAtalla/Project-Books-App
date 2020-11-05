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
    dispatch({ type: 'SEARCH_TERM', searchTerm: term, startIndex: 0, fetchingSearch: true });
  };

  return (
    <header>
      <input type="text" id="searchText" onChange={handleSearchInput} />
      <div>
        <button type="button" onClick={handleSearchButtom}>
          <Link to={`/${state.searchTerm}`}>Search</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
