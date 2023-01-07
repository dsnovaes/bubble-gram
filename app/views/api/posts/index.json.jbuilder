@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :id, :user_id, :caption, :created_at, :comment_ids, :reaction_ids
        json.mediaUrl post.media.url
        json.username post.user.username
        json.user do
            json.profile_picture_url post.user.profile_picture.url
            json.name post.user.name
        end
    end
end