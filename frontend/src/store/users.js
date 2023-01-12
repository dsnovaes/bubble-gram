import csrfFetch from './csrf';
import {storeCurrentUser,setCurrentUser} from "./session"

const RECEIVE_USER = 'users/receiveUser';
const RECEIVE_USERS = 'users/receiveUsers';
const UPDATE_PROFILE_PICTURE = 'users/updateProfilePic';
const REMOVE_USERS = 'users/removeUsers';

const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    payload: user
  };
};

const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

export const removeUsers = () => {
  return {
    type: REMOVE_USERS
  }
}
  
export const fetchUsers = (type) => async dispatch => {
  const res = await csrfFetch(`/api/users?type=${type}`);
  if(res.ok) {
    const users = await res.json();
    dispatch(receiveUsers(users));
  }
}

export const updateProfilePic = async userData => {
  const response = await csrfFetch(`/api/users/${userData.id}`, {
      method: "PUT",
      body: userData
  });
  // const data = await response.json();
  // dispatch(receiveUser(data.user));
  // return response;
}
  
export const fetchUser = (username) => async dispatch => {
  const res = await csrfFetch(`/api/users/${username}?username=${username}`);
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
    dispatch(receiveUser(data));
    return data.user;
};

export const deleteProfilePicture = (user) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        user: { profilePicture: null }
      })
  });
  const data = await response.json();
  dispatch(receiveUser(data));
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return data.user;
}


const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return { ...state, [action.payload.user.id]: action.payload.user };
    case RECEIVE_USERS:
      return { ...action.users };
    case REMOVE_USERS:
      return {};
    default:
      return state;
  }
};

export default usersReducer;