json.post do
    json.extract! @post, :id, :user_id, :caption, :created_at, :reaction_ids, :comment_ids
    json.mediaUrl @post.media.url if @post.media.attached?
end

json.user do
    json.extract! @user, :id, :username, :name
    json.profile_picture_url @user.profile_picture.url if @user.profile_picture.attached?
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
            json.mediaUrl post.media.url if post.media.attached?
        end
    end
end