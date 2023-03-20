import ProfilePicture from "../ProfilePicture"
const SearchResult = ({user}) => {
    return (
        <li>
            <a href={`/users/${user.username}`} title={`${user.postIds.length} posts`}> 
                <ProfilePicture user={user} /> 
                <div>
                    <p>{user.username}</p>
                    <p><small>{user.name}</small></p>
                </div>
            </a>
        </li>
    )
}

export default SearchResult