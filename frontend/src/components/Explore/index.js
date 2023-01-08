import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removePosts } from '../../store/posts'
import PostIndexItem from '../PostIndexItem'
import "./Explore.css"
import Header from "../Header"

const Explore = () => {
    const dispatch = useDispatch();
    let posts = useSelector(state => state.posts ? Object.values(state.posts) : []);

    useEffect(() => {
        document.title="Explore - BubbleGram"
        dispatch(fetchPosts());
        return () => dispatch(removePosts());
    }, [dispatch])

    return (
        <div className="container">
            <Header />
            <div className="explorePage">
                <div className="grid">
                    {posts?.map(post => <PostIndexItem post={post} key={post.id}/>)}
                </div>
            </div>
        </div>
    )
}
export default Explore;