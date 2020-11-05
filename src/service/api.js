import axios from 'axios';

const AUTH_KEY = () => {
  const auth = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_KEY : null;
  return auth;
};
const api = axios.create({ baseURL: 'https://www.googleapis.com/books/v1/' });

export const searchBooks = async (searchText = 'alice', startIndex = 0) => {
  const URL = `/volumes?q=${searchText}&maxResults=20&startIndex=${startIndex}&key=${AUTH_KEY()}`;

  try {
    const { data } = await api.get(URL);

    return data;
  } catch (err) {
    return console.error(err);
  }
};

export default api;
