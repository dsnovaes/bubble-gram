import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiSettings3Fill, RiUserFollowLine } from 'react-icons/ri';
import { SlUserFollow } from 'react-icons/sl';

const FollowButton = ({user}) => {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) {
        if (sessionUser.id === user.id) {
            return (
                <button className="sessionUser">Edit profile <RiSettings3Fill /></button>
            )
        } else if (user.followerIds.includes(sessionUser.id)) {
            return (
                <button className="following">Following <RiUserFollowLine /></button>
            )
        } else {
            return (
                <button className="notFollowing">Follow <SlUserFollow /></button>
            )
        }
            
    }
}
export default FollowButton