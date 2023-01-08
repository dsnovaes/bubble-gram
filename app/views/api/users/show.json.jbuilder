json.user do
    json.extract! @user, :id, :username, :name, :email, :bio, :private_profile, :post_ids, :follower_ids, :following_ids
    json.profile_picture_url @user.profile_picture.url if @user.profile_picture.attached?
    json.posts do
        @user.posts.each do |post|
            json.set! post.id do 
                json.extract! post, :id, :caption
                json.media_url post.media.url
            end
        end
    end
end
