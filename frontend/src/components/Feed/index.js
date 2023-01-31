import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, removePosts } from "../../store/posts"
import { fetchUsers } from "../../store/users"
import Header from "../Header"
import PostFeed from "../PostFeed"
import ProfilePicture from "../ProfilePicture";
import SuggestedUser from "../SuggestedUser";
import Loading from "../Loading"
import "./Feed.css"


const Feed = () => {
    const sessionUser = useSelector(state => state.session.user);
    const posts = useSelector(state => state.posts ? Object.values(state.posts) : []);
    const users = useSelector(state => state.users ? Object.values(state.users) : []);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title="Feed - BubbleGram"
        dispatch(fetchPosts(sessionUser.id, "feed"))
            .then(() =>  setLoaded(true))
            .then(()=>window.scrollTo(0,0))
        dispatch(fetchUsers("suggestions"))
        return () => dispatch(removePosts());
    }, [dispatch,sessionUser.id])

    if(!loaded){
        return (
          <Loading />
        )
      } else {
        return (
            <div className="container">
                <Header />
                <div className="feed">
                    <div className="center">
                        <section className="timeline">
                            {posts.length ? (
                                posts?.reverse().map(post => <PostFeed post={post} key={post.id}/>)
                                ):(
                                    <div className="notFollowingAnyone">
                                        <h1>Welcome to Bubblegram</h1>
                                        <div className={sessionUser.profilePictureUrl ? "hasProfilePicture" : ""}>
                                            <h2><span>Upload a profile picture</span></h2>
                                            <p>Visit your <a href="/settings">settings</a> and upload a nice profile picture</p>
                                        </div>
                                        <div className={posts.length ? "isFollowingSomeone" : ""}>
                                            <h2><span>Follow some interesting people</span></h2>
                                            <p>Here is a selection of users we suggest you to follow</p>
                                            <div className="suggested">
                                                {users?.map(user => <SuggestedUser user={user} key={user.id} />)}
                                            </div>
                                            <p>Are you done? <a href="/">Refresh the page</a> to see posts.</p>
                                        </div>
                                    </div>
                                )
                            }
                        </section>
                        <aside>
                            <div className="myProfile">
                                <a href={`/users/${sessionUser.username}`}>
                                    <div className="profile">
                                        <ProfilePicture user={sessionUser} />
                                    </div>
                                    <div className="text">
                                        <h2>{sessionUser.username}</h2>
                                        <h3>{sessionUser.name}</h3>
                                    </div>
                                </a>
                            </div>
                            {users && 
                            <div className="suggestions">
                                <h3>Suggestions for you</h3>
                                {users?.map(user => <SuggestedUser user={user} key={user.id} />)}
                            </div>
                            }
                            <footer>
                                <p>Disclaimer: assets and the general idea of this product is either property of Meta© and/or inspired on Instagram©</p>
                                <p>This product was built for educational purposes only by Diego Novaes.</p>
                                <ul>
                                    <li><a href="https://github.com/dsnovaes/bubble-gram" target="_blank">About this project on Github</a></li>
                                    <li><a href="https://linkedin.com/in/diegonovaes" target="_blank">LinkedIn of Diego Novaes</a></li>
                                </ul>
                            </footer>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
}
export default Feed;