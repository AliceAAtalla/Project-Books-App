export const initialState = {
  data: [],
  totalItems: 0,
  startIndex: 0,
  searchTerm: 'alice',
  fetchingSearch: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING_INITIAL':
      return {
        ...state,
        data: action.data,
        totalItems: action.total,
      };
    case 'SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.searchTerm,
        startIndex: action.startIndex,
        fetchingSearch: action.fetchingSearch,
      };
    case 'FETCHING_SEARCH':
      return {
        ...state,
        data: action.data,
        totalItems: action.total,
      };
    case 'LOAD_MORE':
      return {
        ...state,
        data: [...state.data, ...action.books],
      };
    case 'START_INDEX':
      return {
        ...state,
        startIndex: state.startIndex + 21,
      };
    default:
      return state;
  }
};
