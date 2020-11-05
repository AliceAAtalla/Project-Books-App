import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [search, setSearch] = useState('');

  const handleSearchInput = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <header>
      <input type="text" id="searchText" onChange={handleSearchInput} />
      <div>
        <Link to={`/${search}`}>Search</Link>
      </div>
    </header>
  );
};

export default Header;
