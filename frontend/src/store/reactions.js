import csrfFetch from './csrf';

const RECEIVE_REACTION = 'reactions/receiveReaction';
const REMOVE_REACTIONS = 'reactions/removeReactions';

const receiveReaction = (reaction) => {
    return {
      type: RECEIVE_REACTION,
      payload: reaction
    };
  };
  
export const removeReactions = () => {
  return {
    type: REMOVE_REACTIONS
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
    const reaction = await res.json();
    dispatch(removeReactions());
  }
}


const reactionsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_REACTION:
      return { ...state, [action.payload.reaction.id]: action.payload.reaction };
    case REMOVE_REACTIONS:
      return {};
    default:
      return state;
  }
};

export default reactionsReducer;