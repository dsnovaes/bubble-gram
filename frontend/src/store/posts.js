import csrfFetch from './csrf';

const RECEIVE_POST = 'posts/receivePost';
const RECEIVE_POSTS = 'posts/receivePosts';
const REMOVE_POSTS = 'posts/removePosts';

const receivePost = (post) => {
    return {
      type: RECEIVE_POST,
      payload: post
    };
  };

const receivePosts = (posts) => {
  return {
    type: RECEIVE_POSTS,
    posts
  };
};


export const removePosts = () => {
  return {
    type: REMOVE_POSTS
  }
}

export const fetchPosts = (userId,type) => async dispatch => {
    // types are: 
    // "feed" -> fetches the posts of the accepted following users of the user
    // "showPage" -> fetches the posts of the use
    const res = await csrfFetch(`/api/posts?type=${type}&userId=${userId}`)
  
    if (res.ok) {
      const posts = await res.json();
      dispatch(receivePosts(posts));
    }
  }
  
export const fetchPost = (postId) => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}`);
  if(res.ok) {
    const post = await res.json();
    dispatch(receivePost(post));
  }
}

export const updatePost = (post) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({
          post
        })
    });
    const data = await response.json();
    dispatch(receivePost(data.post));
    return response;
};


const postsReducer = (state = {}, action) => {
  // debugger
  switch (action.type) {
    case RECEIVE_POST:
      return { ...state, [action.payload.post.id]: action.payload.post };
    case RECEIVE_POSTS:
    return { ...action.posts };
    case REMOVE_POSTS:
      return {};
    default:
      return state;
  }
};

export default postsReducer;