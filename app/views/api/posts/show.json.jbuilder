json.post do
    json.extract! @post, :id, :user_id, :caption, :created_at, :reaction_ids, :comment_ids
    json.mediaUrl url_for(@post.media)
end

json.user do
    json.extract! @user, :id, :username, :name
    json.profilePictureUrl url_for(@user.profile_picture)
end

json.related do 
    @related.each do|post|
        json.set! post.id do  
            json.extract! post, :id, :user_id, :caption
            # json.mediaUrl url_for(post.media)
        end
    end
end