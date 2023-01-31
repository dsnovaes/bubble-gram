import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Header"
import { fetchUser, removeUsers } from "../../store/users"
import "./UserPage.css"
import PostIndexItem from "../PostIndexItem"
import ProfilePicture from "../ProfilePicture";
import FollowButton from "../FollowButton";
import Loading from "../Loading"
import ListFollows from "../Modal/ListFollows";
import {Modal} from "../Modal/Modal"
import { removeFollows } from "../../store/follows";

const UserPage = () => {
    const {username} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        document.title=`${username} on BubbleGram`
        dispatch(fetchUser(username)).then(() =>  setLoaded(true));
        return () => dispatch(removeUsers());
    }, [dispatch,username])

    const users = useSelector(state => state.users ? Object.values(state.users) : []);
    const user = users.find(user => user.username === username);
    const posts = user?.posts ? Object.values(user?.posts) : []
    
    const toggleFollowersModal = () => {
        setShowModal(!showModal)
        if (!showModal) dispatch(removeFollows());
    }

    if(!loaded){
        return (
          <Loading />
        )
      } else if (loaded && user) { 
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
                                <div><strong>{user.postIds.length}</strong> posts</div>
                                <div><strong>{user.followerIds.length}</strong> followers</div>
                                <div><strong>{user.followingIds.length}</strong> following</div>
                            </div>
                            <div className="">
                                <h2>{user.name}</h2>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                    </div>
                    { (sessionUser.id === user.id || user.followingIds.includes(sessionUser.id) || !user.privateProfile) ? (
                    <div className="grid">
                        { posts.length ? (
                            posts.map(post => <PostIndexItem post={post} key={post.id}/>)
                        ) : 
                        <div className="privateProfile">
                            <h2>No posts yet</h2>
                        </div> }
                    </div>
                    ) : 
                    <div className="privateProfile">
                    <p>This Account is Private</p>
                    <p>Follow to see their photos and videos.</p> </div> }
                </div>

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ListFollows type="followers" username={user.username} setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        )
    }
}
export default UserPage;