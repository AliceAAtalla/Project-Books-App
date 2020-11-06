import axios from 'axios';

const AUTH_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({ baseURL: 'https://www.googleapis.com/books/v1/' });

export const searchBooks = async (startIndex, searchText) => {
  const URL = `/volumes?q=${searchText}&maxResults=20&startIndex=${startIndex}&key=${AUTH_KEY}`;

  try {
    const { data } = await api.get(URL);

    return data;
  } catch (err) {
    return console.error(err);
  }
};

export const getByIdBook = async (idBook) => {
  const URL = `/volumes/${idBook}?key=${AUTH_KEY}`;

  try {
    const { data } = await api.get(URL);

    return data;
  } catch (err) {
    return console.error(err);
  }
};

export default api;
