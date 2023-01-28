import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../store/posts"
import "./EditCaption.css"
import ProfilePicture from "../ProfilePicture"

const EditCaption = ({post,setShowModal}) => {
    const [newContent,setNewContent] = useState(post.caption)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleEdit = async e => {
        e.preventDefault();
        let editedContent = {
            id: post.id,
            caption: newContent
        }
        if (newContent !== post.caption) dispatch(updatePost(editedContent)).then(setShowModal(false))

    }

    return (
        <div className="EditCaption">
            <form onSubmit={handleEdit}>
                <div className="top">
                    <div className="user">
                        <ProfilePicture user={sessionUser} /> <span className="username">{sessionUser.username}</span>
                    </div>
                    <button>Save</button>
                </div>
                <textarea autoFocus onChange={e => setNewContent(e.target.value)} value={newContent} rows="8" placeholder="Type caption here">
                    {newContent}
                </textarea>
                <ul className="errors">
                    {errors.map(error => <li key={error}>{error}</li>)}
                </ul>
            </form>
        </div>
    )
}

export default EditCaption;