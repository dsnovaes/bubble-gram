import moment from 'moment';
import ProfilePicture from '../ProfilePicture';

const ViewComment = ({comment}) => {
        return (
            <div className="comment">
                <a href={`/${comment.user.username}`}><ProfilePicture user={comment.user} /></a>
                <div>
                    <p><a href={`/${comment.user.username}`}><strong>{comment.user.username}</strong></a> {comment.body}</p>
                    <p><time title={new Date(comment.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(comment.createdAt).fromNow()}</time></p>
                </div>
            </div>
        )
    }
export default ViewComment