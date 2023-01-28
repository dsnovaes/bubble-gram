import React, { useEffect, useState } from 'react';
import {FaComment,FaHeart} from "react-icons/fa"
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
            <a href={`/posts/${post.id}`}>
                <div className="hoverInfo">
                    <div><FaHeart />{post.reactionIds.length}</div>
                    <div><FaComment /> {post.commentIds.length}</div>
                </div>
                <img src={post.mediaUrl} alt="thumbnail" />
            </a>
        </div>
    ) }
}

export default PostIndexItem