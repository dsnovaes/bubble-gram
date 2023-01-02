import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { fetchPosts, removePosts } from '../../store/posts'

const ShowPage = () => {
    const dispatch = useDispatch();
    let posts = useSelector(state => state.posts ? Object.values(state.posts) : []);
    // const sessionUser = useSelector(state => state.session.user);

    const {postId} = useParams()
    const postIdInt = parseInt(postId)
    console.log("this is the id",postIdInt)

    useEffect(() => {
        dispatch(fetchPosts());
        return () => dispatch(removePosts());
    }, [dispatch,postId])

    let post = posts.find(post => post.id === postIdInt);
    console.log("this is the post",post)

    // const user = "find user by user_id"

    // if (!postIdInt) return <Redirect to={`/${user.username}`} />; // redirect to users' profile page if private and not followed account

    if (post) {
        return (
            <div className="container">
                <h1>Show page for post {post.id}</h1>
                <h2>{post.caption}</h2>
            </div>
        )
    }
}
export default ShowPage;