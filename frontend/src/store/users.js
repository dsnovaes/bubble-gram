import csrfFetch from './csrf';

const RECEIVE_USER = 'users/receiveUser';
const RECEIVE_USERS = 'users/receiveUsers';
const REMOVE_USERS = 'users/removeUsers';

const receiveUser = (user) => {
    return {
      type: RECEIVE_USER,
      payload: user
    };
  };

export const removeUsers = () => {
  return {
    type: REMOVE_USERS
  }
}
  
export const fetchUser = (userId, username) => async dispatch => {
  const res = await csrfFetch(`/api/users/${username}?userid=${userId}`);
  if(res.ok) {
    const user = await res.json();
    dispatch(receiveUser(user));
  }
}

export const updateUser = (user) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify({
          user
        })
    });
    const data = await response.json();
    dispatch(receiveUser(data.user));
    return response;
};


const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, [action.user.id]: action.user };
    case RECEIVE_USERS:
    return { ...action.users };
    case REMOVE_USERS:
      return {};
    default:
      return state;
  }
};

export default usersReducer;