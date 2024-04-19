import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory, NavLink } from 'react-router-dom';
import { fetchPost, removePosts, updatePost, deletePost } from '../../store/posts'
import { fetchComments, removeComments } from '../../store/comments'
import './ShowPage.css'
import moment from 'moment';
import PostIndexItem from "../PostIndexItem"
import ProfilePicture from '../ProfilePicture'
import LikeButton from "../Like"
import NewComment from '../NewComment';
import Header from "../Header"
import ViewComment from '../ViewComment';
import FollowButton from "../FollowButton"
import { Modal } from '../Modal/Modal';
import EditCaption from '../Modal/EditCaption';
import {SlOptions} from "react-icons/sl"

const ShowPage = () => {
    const {postId} = useParams()
    const postIdInt = parseInt(postId)
    const sessionUser = useSelector(state => state.session.user);
    const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
    const posts = useSelector(state => state.posts ? Object.values(state.posts) : []);
    const [showModal, setShowModal] = useState(false);
    const [showOptions,setShowOptions] = useState(false);
    useEffect(() => {
        console.log("change in the modal state",showModal)
    },[showModal])

    const openOptions = () => {
        if (showOptions) return;
        setShowOptions(true);
    };
    
    useEffect(() => {
        if (!showOptions) return;

        const closeOptions = () => {
            setShowOptions(false);
        };

        document.addEventListener('click', closeOptions);
    
        return () => document.removeEventListener("click", closeOptions);
    }, [showOptions]);
    
    const post = posts.find(post => post.id === postIdInt);
    const post_user = posts[1]
    const related = posts[2] ? Object.values(posts[2]) : []

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(fetchPost(postIdInt))
            dispatch(fetchComments(postIdInt));
        }
        catch(err) {
            alert("error");
            console.error(err)
        }
        return () => {
            dispatch(removePosts());
            dispatch(removeComments());
        }
    }, [dispatch,postId,postIdInt])


    useEffect(()=>{
        document.title="Check this photo - BubbleGram"
    },[posts])

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this photo?")) {
            dispatch(deletePost(postIdInt)).then(() => history.push(`/users/${post_user.username}`))
        }
    }

    if (!sessionUser && post_user?.privateProfile) return <Redirect to="/login" />; 

    if (post && comments) {
        return (
            <div className="container">
                { sessionUser ?  <Header /> : <div></div> }
                <div>
                    <article className="showPage">
                        <figure>
                            <img src={post.mediaUrl} loading="lazy" alt="media" />
                        </figure>
                        <aside>
                            <div className="top">
                                <NavLink to={`/users/${post_user.username}`}>
                                    <div className="profile">
                                        <ProfilePicture user={post_user} />
                                    </div>
                                    <h2>{post_user.username}</h2>
                                </NavLink>
                                { post_user.id !== sessionUser.id ? (
                                <FollowButton user={post_user} /> ) : (
                                    <button onClick={openOptions} className="optionsBtn"><SlOptions /></button>
                                )}
                                {showOptions && (
                                    <div className="postOptions">
                                        <ul>
                                            <li>
                                                <a onClick={()=>setShowModal(true)}>{!post.caption ? ("Create"):("Edit")} caption</a>
                                            </li>
                                            <li>
                                                <a onClick={()=>handleDelete(post.id)}>Delete post</a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {!comments.length && !post.caption ? (
                                <div className="empty">
                                    <h2>No comments yet.</h2>
                                    <h3>Start the conversation.</h3>
                                    {sessionUser.id === post.userId && !post.caption?.length && ( <button onClick={()=>setShowModal(true)}>Create a caption</button> )}
                                </div>
                                ) : (
                            <div className="comments">
                                {post.caption && 
                                <div className="comment">
                                    <NavLink to={`/users/${post_user.username}`}><ProfilePicture user={post_user} /></NavLink>
                                    <div>
                                        <p><NavLink to={`/users/${post_user.username}`}><strong>{post_user.username}</strong></NavLink> {post.caption} { new Date(post.createdAt).toISOString().split('.')[0] !== new Date(post.updatedAt).toISOString().split('.')[0] && ( <small>(edited)</small> ) }</p>
                                        { sessionUser.id === post.userId && ( <p><button onClick={()=>setShowModal(true)}>Edit caption</button></p> ) }
                                        <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                                    </div>
                                </div>}

                                {comments?.map(comment => <ViewComment comment={comment} key={comment.id}/>)}

                            </div>
                            )}

                            {showModal && (
                                <Modal onClose={() => setShowModal(false)}>
                                    <EditCaption post={post} setShowModal={setShowModal} />
                                </Modal>
                            )}
                            <div className="more">
                                <div className="buttons">
                                    <LikeButton post={post} />
                                    <button className="commentBtn"><svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                                </div>  
                                <p className="likesCount">{post.reactionIds.length} like{post.reactionIds.length !== 1 ? "s" : null }</p>
                                <time>{new Date(post.createdAt).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric'})}</time>
                                <NewComment postId={post.id} />
                            </div>
                        </aside>
                    </article>
                    { related.length > 0 && (
                    <div className="related">
                        <h3>More from <strong><a href={`/users/${post_user.username}`}>{post_user.username}</a></strong></h3>
                        <div className="grid">
                            {related?.reverse().map(relatedPost => <PostIndexItem post={relatedPost} key={relatedPost.id}/>)}
                        </div>
                    </div> )}
                </div>
            </div>
        )
    }
}
export default ShowPage;