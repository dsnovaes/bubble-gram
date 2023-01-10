import { useState, useEffect } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchComment, createComment } from "../../store/comments";
import "./NewComment.css"

const NewComment = ({postId}) => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [body, setBody] = useState("");
    const [enableButton,setEnableButton] = useState(false)

    let comment = {
        postId: postId,
        userId: sessionUser.id,
        body: body
    }
    useEffect(()=>{
        if (body !== "") {
            setEnableButton(true)
        } else {
            setEnableButton(false)
        }
    },[body])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([]);
        comment = {...comment, body}
        return dispatch(createComment(comment)).then(() => history.push(`/posts/${postId}`))
        .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if the server is down
            }
            if (data?.errors) {
              setErrors(data.errors)
    
            }
            else if (data) {
              setErrors([data])
    
            }
            else {
              setErrors([res.statusText])
            }
          });
    }
    return (
    <div className="newComment">
        <ul className="listing-form-errors" >
            {errors?.map(error => <li key={error}>{error}</li>)}
        </ul>
        <form onSubmit={handleSubmit}>
            <svg aria-label="Emoji" color="#fff" fill="#fff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
            <input type="text" autoFocus name="" placeholder="Add a comment..." value={body} onChange={e => setBody(e.target.value)} />
            {enableButton ? (<button>Post</button>) : <button disabled>Post</button> }
        </form>
    </div>
    )
}
export default NewComment