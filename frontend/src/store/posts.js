// import csrfFetch from './csrf';

// const SET_POSTS = 'session/setPosts';
// const REMOVE_POSTS = 'session/removePosts';

// const setPosts = (user) => {
//   return {
//     type: SET_POSTS,
//     payload: user
//   };
// };

// const removePosts = () => {
//   return {
//     type: REMOVE_POSTS
//   };
// };

// const storeCSRFToken = response => {
//     const csrfToken = response.headers.get("X-CSRF-Token");
//     if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
// }

// const storePosts = user => {
//     if (user) sessionStorage.setItem("posts", JSON.stringify(user));
//     else sessionStorage.removeItem("posts");
// }

// export const login = ({ credential, password }) => async dispatch => {
//     const response = await csrfFetch("/api/posts", {
//         method: "POST",
//         body: JSON.stringify({ credential, password })
//     });
//     const data = await response.json();
//     storePosts(data.user);
//     dispatch(setPosts(data.user));
//     return response;
// };

// export const restoreSession = () => async dispatch => {
//     const response = await csrfFetch("/api/session");
//     storeCSRFToken(response);
//     const data = await response.json();
//     storePosts(data.user);
//     dispatch(setPosts(data.user));
//     return response;
// };

// export const signup = (user) => async (dispatch) => {
//     let { username, email, password, name, bio, private_profile } = user;
//     if (private_profile === "true") { 
//         private_profile = true;
//     } else {
//         private_profile = false;
//     }
//     const response = await csrfFetch("/api/users", {
//         method: "POST",
//         body: JSON.stringify({
//             username,
//             email,
//             name,
//             password,
//             bio,
//             private_profile
//         })
//     });
//     const data = await response.json();
//     storePosts(data.user);
//     dispatch(setPosts(data.user));
//     return response;
// };

// export const logout = () => async (dispatch) => {
//     const response = await csrfFetch("/api/session", {
//         method: "DELETE"
//     });
//     storePosts(null);
//     dispatch(removePosts());
//     return response;
// };


// const initialState = { 
//     user: JSON.parse(sessionStorage.getItem("posts"))
// };

// const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_POSTS:
//       return { ...state, user: action.payload };
//     case REMOVE_POSTS:
//       return { ...state, user: null };
//     default:
//       return state;
//   }
// };

// export default sessionReducer;