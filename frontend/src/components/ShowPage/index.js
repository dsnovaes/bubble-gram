import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchPost, removePosts } from '../../store/posts'
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

const ShowPage = () => {
    const {postId} = useParams()
    const postIdInt = parseInt(postId)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPost(postIdInt));
        return () => dispatch(removePosts());
    }, [dispatch,postId])

    useEffect(() => {
        dispatch(fetchComments(postIdInt));
        return () => dispatch(removeComments());
    }, [dispatch,postId])

    let posts = useSelector(state => state.posts ? Object.values(state.posts) : []);

    let post = posts.find(post => post.id === postIdInt);
    let post_user = posts[1]
    let related = posts[2] ? Object.values(posts[2]) : []
    const comments = useSelector(state => state.comments ? Object.values(state.comments) : []);
    
    if (!postIdInt) return <Redirect to={`/${post_user.username}`} />; // redirect to users' profile page if private and not followed account

    if (post && comments) {
        return (
            <div className="container">
                <Header />
                <div>
                    <article className="showPage">
                        <figure>
                            <img src={post.mediaUrl} alt="media" />
                        </figure>
                        <aside>
                            <div className="top">
                                <a href={`/${post_user.username}`}>
                                    <div className="profile">
                                        <ProfilePicture user={post_user} />
                                    </div>
                                    <h2>{post_user.username}</h2>
                                </a>
                                { !post_user.followed && (
                                <FollowButton /> )}
                            </div>
                            <div className="comments">
                                {/* first comment is the caption */}

                                <div className="comment">
                                    <a href={`/${post_user.username}`}><ProfilePicture user={post_user} /></a>
                                    <div>
                                        <p><a href={`/${post_user.username}`}><strong>{post_user.username}</strong></a> {post.caption}</p>
                                        <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                                    </div>
                                </div>
                                {/* loop actual comments */}
                                {comments?.map(comment => <ViewComment comment={comment} key={comment.id}/>)}

                            </div>
                            <div className="more">

                                <div className="buttons">
                                    <LikeButton />
                                    <button className="commentBtn"><svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                                </div>  
                                <p className="likesCount">{post.reactionIds.length} likes</p>
                                <time>{new Date(post.createdAt).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric'})}</time>
                                <NewComment />
                            </div>
                        </aside>
                    </article>
                    <div className="related">
                        <h3>More from <strong><a href={`/${post_user.username}`}>{post_user.username}</a></strong></h3>
                        <div className="grid">
                            {related?.map(relatedPost => <PostIndexItem post={relatedPost} key={relatedPost.id}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ShowPage;