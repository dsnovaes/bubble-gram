import FollowButton from "../FollowButton"

const SuggestedUser = ({user}) => {
    return (
    <div className="suggestedUser">
        <a href={`/users/${user.username}`}>
            <div className="profile">
                <img src={user.profilePictureUrl} loading="lazy" alt={`/users/${user.username}`} />
            </div>
            <div className="text">
                <h2>{user.username}</h2>
                <h3>{user.name}</h3>
            </div>
        </a>

        <FollowButton user={user} />

    </div>
    )
}
export default SuggestedUser