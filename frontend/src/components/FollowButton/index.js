import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { RiSettings3Fill, RiUserFollowLine } from 'react-icons/ri';
import { SlUserFollow } from 'react-icons/sl';
import { createFollow, unFollow } from '../../store/follows';

const FollowButton = ({user}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollow = () => {
        if (!isFollowing) {
            dispatch(createFollow(sessionUser.id,user.id));
            setIsFollowing(true)
        } else {
            dispatch(unFollow(sessionUser.id,user.id));
            setIsFollowing(false)
        }
    }

    useEffect(()=> {
        if (user.followerIds.includes(sessionUser.id)) {
            setIsFollowing(true)
        }
    },[dispatch])

    if (sessionUser) {

        if (sessionUser.id === user.id) {
            return (
                <button className="sessionUser" onClick={()=>history.push("/settings")}>Edit profile <RiSettings3Fill /></button>
            )

        }
        if (isFollowing) {
            return ( <button className="following" onClick={handleFollow}>Following <RiUserFollowLine /></button> )
        } else {
            return ( <button className="notFollowing" onClick={handleFollow}>Follow <SlUserFollow /></button> )
        }

            
    } else {
        return (
            <button>Login to follow {user.username}</button>
        )
    }
}
export default FollowButton