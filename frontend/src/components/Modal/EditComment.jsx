import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment} from "../../store/comments"
import "./EditCaption.css"
import ProfilePicture from "../ProfilePicture"

const EditComment = ({comment,setShowModal}) => {
    const [newContent,setNewContent] = useState(comment.body)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const [enableButton,setEnableButton] = useState(false)

    const handleEdit = async e => {
        e.preventDefault();
        let editedComment = {
            id: comment.id,
            body: newContent
        }
        if (newContent !== comment.body) dispatch(updateComment(editedComment)).then(setShowModal(false))

    }
    useEffect(()=>{
        if (newContent !== "") {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    },[newContent])

    return (
        <div className="EditCaption">
            <form onSubmit={handleEdit}>
                <div className="top">
                    <div className="user">
                        <ProfilePicture user={comment.user} /> <span className="username">{comment.user.username}</span>
                    </div>
                    {enableButton ? <button>Save</button> : <button disabled>Save</button>}
                </div>
                <textarea autoFocus onChange={e => setNewContent(e.target.value)} value={newContent} rows="8" placeholder="Type comment here">
                    {newContent}
                </textarea>
                <ul className="errors">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </form>
        </div>
    )
}

export default EditComment;