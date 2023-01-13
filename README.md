# BubbleGram (Instagram-Clone)
(put screenshot here)

## Live Version
Check out the live site → [https://bubblegram.onrender.com/](https://bubblegram.onrender.com/)

## Background
BubbleGram is a full-stack React/Redux/Rails clone of Instagram's web interface.

## Overview & Functionalities

### Posts
Share a photo with an optional caption, edit it, delete it and see other posts
(screenshot)

### Comments
Comment on posts, edit and delete their own comments, and see comments from other users on posts
(screenshot)

### Likes
Like posts and unlike posts previously liked by their own
(screenshot)

### Follows
Follow and unfollow (delete a follow relation) other users. That feature allows the user to see the posts of the user being followed in their own feed
(screnshot)

### Search users
(screenshot)

### Settings
The user is able to upload a profile picture, change its personal info and change its password
(screenhost)

## Libraries & Techonologies
- Javascript
- React
- Redux
- AWS S3
- Ruby on Rails
- JSON / JBuilder
- HTML/CSS
- Render
- React-Icons
- PostgreSQL


## Sample Post Thunk Actions & Reducer (Redux)
```javascript
//...
export const createPost = (postData) => async (dispatch) => {
    const response = await csrfFetch(`/api/posts`, {
        method: "POST",
        body: postData
    });
    const data = await response.json();
    dispatch(receivePost(data.post));
    return response;
};
//...
export const fetchPost = (postId) => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}`);
  if(res.ok) {
    const post = await res.json();
    dispatch(receivePost(post));
  }
}
// reducer
const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      return { ...state, [action.payload.post.id]: action.payload.post, user: action.payload.user, related: action.payload.related };
    case RECEIVE_POSTS:
      return { ...action.posts };
    case RECEIVE_REACTION:
      const nextState = { ...state }
      let post = nextState[action.payload.reaction.postId]
      post.reactionIds.push(action.payload.reaction.id)
      return nextState;
    case REMOVE_REACTION:
      const nextStateRemove = { ...state }
      let postRemove = nextStateRemove[action.payload]
      postRemove.reactionIds.pop()
      return nextStateRemove;
    case REMOVE_POSTS:
      return {};
    default:
      return state;
  }
};
```
## Sample Component (Feed)

```javascript
const Feed = () => {
    const sessionUser = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts ? Object.values(state.posts) : []);
    const users = useSelector(state => state.users ? Object.values(state.users) : []);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title="Feed - BubbleGram"
        dispatch(fetchPosts(sessionUser.id, "feed")).then(()=>window.scrollTo(0,0))
        dispatch(fetchUsers("suggestions"))
        return () => dispatch(removePosts());
    }, [dispatch,sessionUser.id])

    if (posts) {
        return (
            <div className="container">
                <Header />
                <div className="feed">
                    <div className="center">
                        <section className="timeline">
                            {posts.length ? (
                                posts?.map(post => <PostFeed post={post} key={post.id}/>)
                                ):("you should follow someone")
                            }                            
                        </section>
//...
```


### Future implementations

- Possibility to protect your posts, having a private profile
- Attaching a location to your posts, so not only users could see where you took a specific photo, but they could also see posts published at that location
- Stories
