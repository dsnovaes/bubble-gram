import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removePosts } from '../../store/posts'
import PostIndexItem from '../PostIndexItem'

const Explore = () => {
    const dispatch = useDispatch();
    let posts = useSelector(state => state.posts ? Object.values(state.posts) : []);

    useEffect(() => {
        dispatch(fetchPosts());
        return () => dispatch(removePosts());
    }, [dispatch])

    return (
        <div className="container">
            <h1>Explore page</h1>
            <ul>
                {posts?.map(post => <PostIndexItem post={post} key={post.id}/>)}
            </ul>
        </div>
    )
}
export default Explore;