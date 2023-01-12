import csrfFetch from './csrf';

export const RECEIVE_REACTION = 'reactions/receiveReaction';
export const REMOVE_REACTION = 'reactions/removeReaction';

const receiveReaction = (reaction) => {
    return {
      type: RECEIVE_REACTION,
      payload: reaction
    };
  };
  
export const removeReaction = (postId) => {
  return {
    type: REMOVE_REACTION,
    payload: postId
  }
}

export const createReaction = (postId) => async dispatch => {
    const reaction = {
      reaction: {
        postId
      }
    }
    const res = await csrfFetch(`/api/reactions`,{
      method: "POST",
      body: JSON.stringify(reaction),
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }})
  
    if (res.ok) {
      const reaction = await res.json();
      dispatch(receiveReaction(reaction));
    }
  }
  
export const unReaction = (postId) => async dispatch => {
  const res = await csrfFetch(`/api/reactions/${postId}`, {method: "DELETE"});
  if(res.ok) {
    dispatch(removeReaction(postId));
  }
}


const reactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_REACTION:
      return { ...state, [action.payload.reaction.id]: action.payload.reaction };
    case REMOVE_REACTION:
      const nextState = {...state}
      delete nextState[action.payload]
      return nextState;
    default:
      return state;
  }
};

export default reactionsReducer;