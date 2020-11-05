import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import BooksContext from './BooksContext';
import { reducer, initialState } from '../reducer';

const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <BooksContext.Provider value={{ state, dispatch }}>{children}</BooksContext.Provider>;
};

BooksProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
};

export default BooksProvider;
