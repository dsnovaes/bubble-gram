import csrfFetch from './csrf';

const RECEIVE_FOLLOW = 'follows/receiveFollow';
const REMOVE_FOLLOWS = 'follows/removeFollows';

const receiveFollow = (follow) => {
    return {
      type: RECEIVE_FOLLOW,
      payload: follow
    };
  };

export const removeFollows = () => {
  return {
    type: REMOVE_FOLLOWS
  }
}

export const createFollow = (follower_id, following_id) => async dispatch => {
    // types are: 
    // "feed" -> fetches the follows of the accepted following users of the user
    // "showPage" -> fetches the follows of the use
    const res = await csrfFetch(`/api/follows?follower_id=${follower_id}&following_id=${following_id}`, { method: "POST" })
  
    if (res.ok) {
      const follow = await res.json();
      dispatch(receiveFollow(follow));
    }
  }
  
export const unFollow = (follower_id, following_id) => async dispatch => {
  const res = await csrfFetch(`/api/follows/?follower_id=${follower_id}&following_id=${following_id}`, { method: "DELETE" });
  if(res.ok) {
    const follow = await res.json();
    dispatch(receiveFollow(follow));
  }
}

export const updateFollow = (follower_id, following_id,status) => async (dispatch) => {
    const response = await csrfFetch(`/api/follows/?follower_id=${follower_id}&following_id=${following_id}`, {
        method: "PUT",
        body: JSON.stringify({
          status
        })
    });
    const data = await response.json();
    dispatch(receiveFollow(data.follow));
    return response;
};


const followsReducer = (state = {}, action) => {
  // debugger
  switch (action.type) {
    case RECEIVE_FOLLOW:
      return { ...state, [action.payload.follow.id]: action.payload.follow };
    case REMOVE_FOLLOWS:
      return {};
    default:
      return state;
  }
};

export default followsReducer;