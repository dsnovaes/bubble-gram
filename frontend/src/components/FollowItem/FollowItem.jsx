import React from "react";
import "./FollowItem.css"
import ProfilePicture from "../ProfilePicture"
import FollowButton from '../FollowButton';

const FollowItem = ({user}) => {
    return (
        <div className="user">
            <div className="left">
                <ProfilePicture user={user} />
                <a href={`/users/${user.username}`} className="username">{user.username}</a>
            </div>
            <FollowButton user={user} />
        </div>
    )
}
export default FollowItem