import PlaceholderPicture from "../../assets/baybridge.jpg"
const PostIndexItem = ({post}) => {
    return (
        <div className="thumbnail">
            <a href={`/posts/${post.id}`}>
                <img src={PlaceholderPicture} />
            </a>
        </div>
    )
}

export default PostIndexItem