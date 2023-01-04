const PostIndexItem = ({post}) => {
    return (
        <li>
            <a href={`/posts/${post.id}`}>View post <strong>{post.id}</strong></a>
        </li>
    )
}

export default PostIndexItem