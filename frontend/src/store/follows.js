import csrfFetch from './csrf';

const RECEIVE_FOLLOW = 'follows/receiveFollow';
const REMOVE_FOLLOWS = 'follows/removeFollows';
const RECEIVE_FOLLOWS = "follows/receiveFollows";

const receiveFollow = (follow) => {
    return {
      type: RECEIVE_FOLLOW,
      payload: follow
    };
  };

const receiveFollows = (follows) => {
    return {
      type: RECEIVE_FOLLOWS,
      payload: follows
    };
  };
  
export const removeFollows = () => {
  return {
    type: REMOVE_FOLLOWS
  }
}

export const createFollow = (currentUser,followingId) => async dispatch => {
    const follow = {
      follow: {
        followerId: currentUser,
        followingId
      }
    }
    const res = await csrfFetch(`/api/follows?followerId=${currentUser}&followingId=${followingId}`,{
      method: "POST",
      body: JSON.stringify(follow),
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }})
  
    // if (res.ok) {
    //   const follow = await res.json();
    //   dispatch(receiveFollow(follow));
    // }
  }
  
export const unFollow = (currentUser, followingId) => async dispatch => {
  const follow = {
    follow: {
      followerId: currentUser,
      followingId
    }
  }
  const res = await csrfFetch(`/api/follows/${currentUser}?followerId=${currentUser}&followingId=${followingId}`, {
    method: "DELETE",
    body: JSON.stringify(follow),
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }});
  // if(res.ok) {
  //   dispatch(removeFollows());
  // }
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

export const getFollowers = (username) => async (dispatch) => {
    const response = await csrfFetch(`/api/follows/?username=${username}&type=followers`);
    if(response.ok) {
      const data = await response.json();
      dispatch(receiveFollows(data));
    }
    return response;
};


const followsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FOLLOWS:
      return { ...action.payload };
    case RECEIVE_FOLLOW:
      return { ...state, [action.payload.follow.id]: action.payload.follow };
    case REMOVE_FOLLOWS:
      return {};
    default:
      return state;
  }
};

export default followsReducer;