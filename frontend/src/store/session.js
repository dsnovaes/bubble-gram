import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const login = ({ credential, password }) => async dispatch => {
  console.log("login")
  const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential, password })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const restoreSession = () => async dispatch => {
  console.log("restoreSession")
  const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    let { username, email, password, name, bio, private_profile } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            name,
            password,
            bio,
            private_profile
        })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const update = (user) => async (dispatch) => {
    let { username, email, password, name, bio, private_profile } = user;
    const response = await csrfFetch("/api/users", {
        method: "PUT",
        body: JSON.stringify({
            username,
            email,
            name,
            password,
            bio,
            private_profile
        })
    });
    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};


const initialState = { 
    user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;