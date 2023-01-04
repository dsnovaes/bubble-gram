import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchPost, removePosts } from '../../store/posts'
import './ShowPage.css'
import moment from 'moment';

const ShowPage = () => {

    const {postId} = useParams()
    const postIdInt = parseInt(postId)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPost(postIdInt));
        return () => dispatch(removePosts());
    }, [dispatch,postId])

    let posts = useSelector(state => state.posts ? Object.values(state.posts) : []);

    let post = posts.find(post => post.id === postIdInt);
    let post_user = posts[1]
    let related = posts[2]

    console.log("this is the user",post_user)

    // if (!postIdInt) return <Redirect to={`/${user.username}`} />; // redirect to users' profile page if private and not followed account

    
    if (post) {
        return (
            <>
            <article className="showPage">
                <figure>
                    <img src={post.mediaUrl} alt="media" />
                </figure>
                <aside>
                    <div className="top">
                        <a href={`/${post_user.username}`}>
                            <div className="profile">
                                <img src={post_user.profilePictureUrl} alt="Diego Novaes" />
                            </div>
                            <h2>{post_user.username}</h2>
                        </a>
                    </div>
                    <div className="comments">
                        {/* first comment is the caption */}
                        <div className="comment">
                            <a href={`/${post_user.username}`}><img src={post_user.profilePictureUrl} alt="Diego Novaes" /></a>
                            <div>
                                <p><a href={`/${post_user.username}`}><strong>{post_user.username}</strong></a> {post.caption}</p>
                                <p><time title={new Date(post.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }>{moment(post.createdAt).fromNow()}</time></p>
                            </div>
                        </div>
                        {/* loop actual comments */}
                        

                    </div>
                    <div className="more">

                        <div className="buttons">
                            <button><svg aria-label="Like" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg></button>
                            <button><svg aria-label="Comment" color="#8e8e8e" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg></button>
                        </div>  
                        <time>{new Date(post.createdAt).toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric'})}</time>
                        <p>{post.reactionIds.length} likes</p>
                        <p>{post.commentIds.length} comments</p>

                        <div className="newComment">
                            <form>
                                <svg aria-label="Emoji" color="#fff" fill="#fff" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
                                <input type="text" name="" placeholder="Add a comment..." />
                                <button disabled>Post</button>
                            </form>
                        </div>
                    </div>
                </aside>
            </article>
            <div className="related">
                6 related posts
            </div>
            </>
        )
    }
}
export default ShowPage;