const PostIndexItem = ({post}) => {
    console.log("this is the post",post)
    return (
        <li>
            Post <strong>{post.id}</strong>, by user <strong>{post.user_id}</strong><br/>
            <a href={`/posts/${post.id}`}>View post</a>
        </li>
    )
}

export default PostIndexItem