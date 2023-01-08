import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Header from "../Header"
import { fetchUser, removeUsers } from "../../store/users"
import "./UserPage.css"
import PostIndexItem from "../PostIndexItem"
import ProfilePicture from '../ProfilePicture';
import FollowButton from '../FollowButton';

const UserPage = () => {
    const {username} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title=`${username} on BubbleGram`
        dispatch(fetchUser(username));
        return () => dispatch(removeUsers());
    }, [dispatch,username])

    const users = useSelector(state => state.users ? Object.values(state.users) : []);
    const user = users.find(user => user.username === username);
    const posts = user?.posts ? Object.values(user?.posts) : []

    // create logic to check private profile
    
    if (user && posts) {
        return (
            <div className="container">
                { sessionUser ?  <Header /> : <div></div> }
                <div className="userPage">
                    <div className="userInfo">
                        <ProfilePicture user={user} />
                        <div>
                            <div className="top">
                                <h1>{user.username}</h1>
                                <FollowButton user={user} />
                            </div>
                            <div className="numbers">
                                <div><strong>{posts.length}</strong> posts</div>
                                <div><strong>{user.followerIds.length}</strong> followers</div>
                                <div><strong>{user.followingIds.length}</strong> following</div>
                            </div>
                            <div className="">
                                <h2>{user.name}</h2>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                    </div>
                    { posts && (
                    <div className="grid">
                        {posts.map(post => <PostIndexItem post={post} key={post.id}/>)}
                    </div>
                    )}
                </div>
            </div>
        )
    }
}
export default UserPage;