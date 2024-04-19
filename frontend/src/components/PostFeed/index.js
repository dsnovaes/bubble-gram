import ProfilePicture from "../ProfilePicture"
import NewComment from "../NewComment"
import { useSelector } from 'react-redux';
import {NavLink} from "react-router-dom"
import moment from 'moment';
import LikeButton from "../Like"

const PostFeed = ({post}) => {
    const sessionUser = useSelector(state => state.session.user);
    
    let currentClass = ""
    if (sessionUser.username === post.username) currentClass = "currentUser";
    if (post) {
        return (
            <div className="post">
                <div className={`top ${currentClass}`}>
                    <NavLink to={`/users/${post.username}`}>
                        <div className="profile">
                            <ProfilePicture user={post.user} />
                        </div>
                        <h2>{post.username}</h2>
                    </NavLink>
                </div>
                <div className="media">
                    <figure>
                        <NavLink to={`/posts/${post.id}`}><img src={post.mediaUrl} loading="lazy" alt="media" /></NavLink>
                    </figure>
                </div>
                <div className="buttons">
                    <LikeButton post={post} />
                    <button className="commentBtn"><svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                </div>  
                <div className="likesCount">{post.reactionIds.length} like{post.reactionIds.length !== 1 ? "s" : null }</div>
                <div className="caption">
                    <p><NavLink to={`/users/${post.username}`}><strong>{post.username}</strong></NavLink> {post.caption}</p>
                </div>
                { post.commentIds.length > 0 &&
                    <div className="viewComments">
                        { post.commentIds.length === 1 ? <p><NavLink to={`/posts/${post.id}`}>View comment</NavLink></p> : <p><NavLink to={`/posts/${post.id}`}>View all {post.commentIds.length} comments</NavLink></p> }
                    </div>
                }
                <div className="date">
                    <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                </div>
                <NewComment postId={post.id} />
            </div>
        )
        }
}
export default PostFeed