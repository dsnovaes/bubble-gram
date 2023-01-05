json.post do
    json.extract! @post, :id, :user_id, :caption, :created_at, :reaction_ids, :comment_ids
    json.mediaUrl url_for(@post.media) if @post.media.attached?
end

json.user do
    json.extract! @user, :id, :username, :name
    json.profilePictureUrl url_for(@user.profile_picture) if @user.profile_picture.attached?
end

json.related do 
    @related.each do|post|
        json.set! post.id do  
            json.extract! post, :id, :user_id, :comment_ids, :reaction_ids
            json.mediaUrl url_for(post.media) if post.media.attached?
        end
    end
end