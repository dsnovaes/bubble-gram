# recieves aaaallll the posts
@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :id, :user_id, :caption, :created_at, :comment_ids, :reaction_ids
        # json.mediaUrl url_for(post.media)
    end
end