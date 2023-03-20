import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePosts } from "../../store/posts"
import { fetchUsers } from "../../store/users"
import Header from "../Header"
import ProfilePicture from "../ProfilePicture";
import Loading from "../Loading"
import PostFeed from "../PostFeed";
import SearchResult from "../SearchResult";
import "./Activity.css"


const Activity = () => {
    const sessionUser = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts ? Object.values(state.posts) : []);
    const users = useSelector(state => state.users ? Object.values(state.users) : []);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title="Activity - BubbleGram"
        dispatch(fetchUsers("all"))
            .then(() =>  setLoaded(true))
        return () => dispatch(removePosts());
    }, [dispatch,sessionUser.id])

    if(!loaded){
        return (
          <Loading />
        )
      } else if (sessionUser.username === "dsnovaes") {
        return (
            <div className="container">
                <Header />
                <div className="activity">
                    <div className="center">
                        <h1>Activity</h1>
                        <section className="timeline">
                            <ul className="results">
                                {users?.reverse().map(user => <SearchResult user={user} key={user.id} />)}
                            </ul>
                            
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}
export default Activity;

{/* <li key={user.id}><a href={`/users/${user.username}`}>{user.username}</a> <em>({user.postIds.length} posts)</em></li> */}