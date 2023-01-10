import moment from 'moment';
import ProfilePicture from '../ProfilePicture';
import { useDispatch, useSelector } from 'react-redux';
import {deleteComment, updateComment} from "../../store/comments"

const ViewComment = ({comment}) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleDelete = (commentId) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteComment(commentId))
        }
    }

    const handleEdit = (comment) => {
        let newBody = prompt("Edit your comment",comment.body)
        let editedComment = {
            id: comment.id,
            body: newBody
        }
        dispatch(updateComment(editedComment))
    }  

    if (comment) {
        return (
            <div className="comment">
                <a href={`/users/${comment.user.username}`}><ProfilePicture user={comment.user} /></a>
                <div>
                    <p><a href={`/users/${comment.user.username}`}><strong>{comment.user.username}</strong></a> {comment.body} { comment.createdAt !== comment.updatedAt && ( <small>(edited)</small> ) } </p>
                    { sessionUser.id === comment.user.id && ( <p><button onClick={()=>handleEdit(comment)}>Edit</button> <button onClick={()=>handleDelete(comment.id)}>Delete</button></p> ) }
                    <p><time title={new Date(comment.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(comment.createdAt).fromNow()}</time></p>
                </div>
            </div>
        )
    }}
export default ViewComment