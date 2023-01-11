json.post do
    json.extract! @post, :id, :user_id, :caption, :created_at, :updated_at, :reaction_ids, :comment_ids
    # json.mediaUrl @post.media.url if @post.media.attached?
    json.mediaUrl "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
    if @post.likers.include?(current_user)
        json.liked true
    else
        json.liked false
    end
end

json.user do
    json.extract! @user, :id, :username, :name, :private_profile, :following_ids, :follower_ids
    # json.profile_picture_url @user.profile_picture.url if @user.profile_picture.attached?
    json.profile_picture_url "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
    if @user.followers.include?(current_user)
        json.followed true
    else
        json.followed false
    end
end

json.related do 
    @related.each do|post|
        json.set! post.id do  
            json.extract! post, :id, :user_id, :comment_ids, :reaction_ids
            # json.mediaUrl post.media.url if post.media.attached?
            json.mediaUrl "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
        end
    end
end