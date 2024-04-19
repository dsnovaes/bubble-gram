import React, { useEffect, useState } from 'react';
import {FaComment,FaHeart} from "react-icons/fa"
import {NavLink} from "react-router-dom"
import Loading from "../Loading"

const PostIndexItem = ({post}) => {
    const [loaded, setLoaded] = useState(false);
    if (!post) {
        return (
          <Loading />
        )
      } else {
    return (
        <div className="thumbnail">
            <NavLink to={`/posts/${post.id}`}>
                <div className="hoverInfo">
                    <div><FaHeart />{post.reactionIds.length}</div>
                    <div><FaComment /> {post.commentIds.length}</div>
                </div>
                <img src={post.mediaUrl} loading="lazy" alt="thumbnail" />
            </NavLink>
        </div>
    ) }
}

export default PostIndexItem