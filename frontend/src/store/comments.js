import csrfFetch from './csrf';

const RECEIVE_COMMENT = 'comments/receiveComment';
const RECEIVE_COMMENTS = 'comments/receiveComments';
const REMOVE_COMMENTS = 'comments/removeComments';

const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    payload: comment
  };
};

const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const removeComments = () => {
  return {
    type: REMOVE_COMMENTS
  }
}
  
export const fetchComments = (postId) => async dispatch => {
  const res = await csrfFetch(`/api/comments?postId=${postId}`);
  if(res.ok) {
    const comments = await res.json();
    dispatch(receiveComments(comments));
  }
}
  
export const fetchComment = (commentId) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentId}`);
  if(res.ok) {
    const comment = await res.json();
    dispatch(receiveComment(comment));
  }
}

export const createComment = (comment) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        comment
      }),
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }
  });
  const data = await response.json();
  dispatch(receiveComment(data));
  return response;
};

export const updateComment = (comment) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        body: JSON.stringify({
          comment
        }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    dispatch(receiveComment(data));
    return response;
};

export const deleteComment = (commentId) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {method: "DELETE"});
  if(res.ok) {
    dispatch(removeComments());
  }
}


const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENT:
      // debugger
      return { ...state, [action.payload.comment.id]: action.payload.comment };
    case RECEIVE_COMMENTS:
    return { ...action.comments };
    case REMOVE_COMMENTS:
      return {};
    default:
      return state;
  }
};

export default commentsReducer;