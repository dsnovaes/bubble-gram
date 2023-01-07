@users.each do |user|
    json.set! user.id do 
        json.extract! user, :id, :username, :name, :created_at, :post_ids, :following_ids, :follower_ids
        json.profilePictureUrl user.profile_picture.url
    end
end