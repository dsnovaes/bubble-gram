import React, { useEffect,useState } from "react";
import moment from 'moment';
import ProfilePicture from '../ProfilePicture';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from "react-router-dom"
import {deleteComment} from "../../store/comments"
import { Modal } from '../Modal/Modal';
import EditComment from '../Modal/EditComment';

const ViewComment = ({comment}) => {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleDelete = (commentId) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteComment(commentId))
        }
    }

    if (comment) {
        return (
            <div className="comment">
                <NavLink to={`/users/${comment.user.username}`}><ProfilePicture user={comment.user} /></NavLink>
                <div>
                    <p><NavLink to={`/users/${comment.user.username}`}><strong>{comment.user.username}</strong></NavLink> {comment.body} { comment.createdAt !== comment.updatedAt && ( <small>(edited)</small> ) } </p>
                    { sessionUser.id === comment.user.id && ( <p><button onClick={()=>setShowModal(true)}>Edit</button> <button onClick={()=>handleDelete(comment.id)}>Delete</button></p> ) }
                    <p><time title={new Date(comment.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(comment.createdAt).fromNow()}</time></p>
                </div>
                
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <EditComment comment={comment} setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>

        )
    }
}
export default ViewComment