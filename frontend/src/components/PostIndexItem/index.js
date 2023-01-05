const PostIndexItem = ({post}) => {
    return (
        <div className="thumbnail">
            <a href={`/posts/${post.id}`}>
                
                <img src={post.mediaUrl} />
            </a>
        </div>
    )
}

export default PostIndexItem