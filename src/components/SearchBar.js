import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { reducer, initialState } from '../reducer';

const Header = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearchInput = (event) => {
    event.preventDefault();
    const { value } = event.target;
    dispatch({ type: 'SEARCH_TERM', searchTerm: value, startIndex: 0, fetchingSearch: true });
  };

  return (
    <header>
      <input type="text" id="searchText" onChange={handleSearchInput} />
      <div>
        <Link to={`/${state.searchTerm}`}>Search</Link>
      </div>
    </header>
  );
};

export default Header;
