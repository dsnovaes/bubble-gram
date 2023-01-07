json.user do
    json.extract! @user, :id, :username, :name, :email, :bio, :private_profile, :post_ids, :follower_ids, :following_ids
    json.profile_picture_url @user.profile_picture.url if @user.profile_picture.attached?
end