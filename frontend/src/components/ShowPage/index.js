import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { fetchPost, removePosts, updatePost, deletePost } from '../../store/posts'
import { fetchComments, removeComments } from '../../store/comments'
import './ShowPage.css'
import moment from 'moment';
import ProfilePicture from '../ProfilePicture';
import PostIndexItem from "../PostIndexItem"
import LikeButton from "../Like"
import NewComment from '../NewComment';
import Header from "../Header"
import ViewComment from '../ViewComment';
import FollowButton from "../FollowButton"
import PlaceholderPicture from "../../assets/baybridge.jpg"

const ShowPage = () => {
    const {postId} = useParams()
    const postIdInt = parseInt(postId)
    const sessionUser = useSelector(state => state.session.user);
    const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
    const posts = useSelector(state => state.posts ? Object.values(state.posts) : []);
    
    const post = posts.find(post => post.id === postIdInt);
    const post_user = posts[1]
    const related = posts[2] ? Object.values(posts[2]) : []

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPost(postIdInt));
        return () => dispatch(removePosts());
    }, [dispatch,postId])

    useEffect(() => {
        dispatch(fetchComments(postIdInt));
        return () => dispatch(removeComments());
    }, [dispatch,postId])


    useEffect(()=>{
        document.title="Check this photo - BubbleGram"
    },[posts])

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this photo?")) {
            dispatch(deletePost(postIdInt)).then(() => history.push(`/users/${post_user.username}`))
        }
    }

    const handleEdit = () => {
        let editingCaption = post.caption || ""
        let newCaption = prompt("Edit the caption of this photo", editingCaption)
        let editedCaption = {
            id: post.id,
            caption: newCaption
        }
        if (newCaption !== editingCaption) dispatch(updatePost(editedCaption))
    }

    if (!sessionUser && post_user?.privateProfile) return <Redirect to="/login" />; 

    // if (!post) return <Redirect to={`/posts`} />

    if (post && comments) {
        return (
            <div className="container">
                { sessionUser ?  <Header /> : <div></div> }
                <div>
                    <article className="showPage">
                        <figure>
                            <img src={PlaceholderPicture} alt="media" />
                        </figure>
                        <aside>
                            <div className="top">
                                <a href={`/users/${post_user.username}`}>
                                    <div className="profile">
                                        <ProfilePicture user={post_user} />
                                    </div>
                                    <h2>{post_user.username}</h2>
                                </a>
                                { !post_user.followed && (
                                <FollowButton user={post_user} /> )}
                            </div>
                            <div className="comments">
                                {/* first comment is the caption */}

                                <div className="comment">
                                    <a href={`/users/${post_user.username}`}><ProfilePicture user={post_user} /></a>
                                    <div>
                                        <p><a href={`/users/${post_user.username}`}><strong>{post_user.username}</strong></a> {post.caption} { new Date(post.createdAt).toISOString().split('.')[0] !== new Date(post.updatedAt).toISOString().split('.')[0] && ( <small>(edited)</small> ) }</p>
                                        { sessionUser.id === post.userId && ( <p><button onClick={()=>handleEdit(post.id)}>Edit caption</button> <button onClick={()=>handleDelete(post.id)}>Delete post</button></p> ) }
                                        <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                                    </div>
                                </div>
                                {/* loop actual comments */}
                                {comments?.map(comment => <ViewComment comment={comment} key={comment.id}/>)}

                            </div>
                            <div className="more">

                                <div className="buttons">
                                    <LikeButton post={post} />
                                    <button className="commentBtn"><svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                                </div>  
                                <p className="likesCount">{post.reactionIds.length} likes</p>
                                <time>{new Date(post.createdAt).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric'})}</time>
                                <NewComment postId={post.id} />
                            </div>
                        </aside>
                    </article>
                    { related.length > 0 && (
                    <div className="related">
                        <h3>More from <strong><a href={`/users/${post_user.username}`}>{post_user.username}</a></strong></h3>
                        <div className="grid">
                            {related?.map(relatedPost => <PostIndexItem post={relatedPost} key={relatedPost.id}/>)}
                        </div>
                    </div> )}
                </div>
            </div>
        )
    }
}
export default ShowPage;