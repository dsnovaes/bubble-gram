import csrfFetch from './csrf';

const SEARCHED_USERS = 'results/searchResultUsers';
const REMOVE_RESULTS = 'results/removeResults';

const searchResultUsers = (results) => {
  return {
    type: SEARCHED_USERS,
    results
  };
};

export const removeResults = () => {
  return {
    type: REMOVE_RESULTS
  }
}
  
export const searchUser = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/search/${query}`)
  if (response.ok) {
    const searchResults = await response.json();
    dispatch(searchResultUsers(searchResults));
  }
}

const resultsReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCHED_USERS:
      return { ...action.results };
    case REMOVE_RESULTS:
      return {};
    default:
      return state;
  }
};

export default resultsReducer;