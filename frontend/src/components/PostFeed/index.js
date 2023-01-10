import ProfilePicture from "../ProfilePicture"
import NewComment from "../NewComment"
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import LikeButton from "../Like"
import PlaceholderPicture from "../../assets/baybridge.jpg" 

const PostFeed = ({post}) => {
    const sessionUser = useSelector(state => state.session.user);
    
    let currentClass = ""
    if (sessionUser.username === post.username) currentClass = "currentUser";
    if (post) {
        return (
            <div className="post">
                <div className={`top ${currentClass}`}>
                    <a href={`/users/${post.username}`}>
                        <div className="profile">
                            <ProfilePicture user={post.user} />
                        </div>
                        <h2>{post.username}</h2>
                    </a>
                </div>
                <div className="media">
                    <figure>
                        <a href={`/posts/${post.id}`}><img src={PlaceholderPicture} alt="media" /></a>
                    </figure>
                </div>
                <div className="buttons">
                    <LikeButton post={post} />
                    <button className="commentBtn"><svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                </div>  
                <div className="likesCount">{post.reactionIds?.length} likes</div>
                <div className="caption">
                    <p><a href={`/users/${post.username}`}><strong>{post.username}</strong></a> {post.caption}</p>
                </div>
                { post.commentIds.length > 0 &&
                    <div className="viewComments">
                        { post.commentIds.length === 1 ? <p><a href="/modal">View comment</a></p> : <p><a href="/modal">View all {post.commentIds.length} comments</a></p> }
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