json.user do
    json.extract! @user, :id, :username, :name, :email, :bio, :private_profile, :post_ids, :follower_ids, :following_ids
    json.profile_picture_url @user.profile_picture.url if @user.profile_picture.attached?
    # json.profile_picture_url "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
    if @show_posts
        json.posts do
            @user.posts.each do |post|
                json.set! post.id do 
                    json.extract! post, :id, :caption, :reaction_ids, :comment_ids
                    json.media_url post.media.url
                    # json.media_url "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
                end
            end
        end
    end
end
