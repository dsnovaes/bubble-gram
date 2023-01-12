import {FaComment,FaHeart} from "react-icons/fa"

import PlaceholderPicture from "../../assets/baybridge.jpg"
const PostIndexItem = ({post}) => {
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
    )
}

export default PostIndexItem