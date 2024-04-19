import {NavLink} from "react-router-dom"
import FollowButton from "../FollowButton"

const SuggestedUser = ({user}) => {
    return (
    <div className="suggestedUser">
        <NavLink to={`/users/${user.username}`}>
            <div className="profile">
                <img src={user.profilePictureUrl} loading="lazy" alt={`/users/${user.username}`} />
            </div>
            <div className="text">
                <h2>{user.username}</h2>
                <h3>{user.name}</h3>
            </div>
        </NavLink>

        <FollowButton user={user} />

    </div>
    )
}
export default SuggestedUser