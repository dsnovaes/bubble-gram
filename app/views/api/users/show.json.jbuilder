json.user do
    json.extract! @user, :id, :username, :name, :email, :bio, :private_profile, :post_ids, :follower_ids, :following_ids
end