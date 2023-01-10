import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removePosts } from '../../store/posts'
import Header from "../Header"
import PostFeed from "../PostFeed"
import ProfilePicture from '../ProfilePicture';
import PlaceholderPicture from "../../assets/baybridge.jpg"
import "./Feed.css"

const Feed = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts ? Object.values(state.posts) : []);

    useEffect(() => {
        document.title="Feed - BubbleGram"
        dispatch(fetchPosts(sessionUser.id, "feed"));
        return () => dispatch(removePosts());
    }, [dispatch])

    if (posts) {
        return (
            <div className="container">
                <Header />
                <div className="feed">
                    <div className="center">
                        <section className="timeline">
                            {posts?.map(post => <PostFeed post={post} key={post.id}/>)}
                            
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
                            <div className="suggestions">
                                <h3>Suggestions for you</h3>
                                <div className="suggestedUser">
                                    <a href="/user.username">
                                        <div className="profile">
                                            <img src={PlaceholderPicture} alt="user.name" />
                                        </div>
                                        <div className="text">
                                            <h2>user.username</h2>
                                            <h3>user.name</h3>
                                        </div>
                                    </a>

                                    <a href="/" className="follow">Follow</a>

                                </div>
                            </div>
                            <footer>
                                <a href="https://github.com/dsnovaes/bubble-gram">About this project on Github</a>
                            </footer>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }
}
export default Feed;