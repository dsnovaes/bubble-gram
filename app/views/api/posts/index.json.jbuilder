@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :id, :user_id, :caption, :created_at, :comment_ids, :reaction_ids
        json.mediaUrl post.media.url
        # json.mediaUrl "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
        if post.likers.include?(current_user)
            json.liked true
        else
            json.liked false
        end
        json.username post.user.username
        json.user do
            json.profile_picture_url post.user.profile_picture.url
            # json.profile_picture_url "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
            json.name post.user.name
        end
    end
end