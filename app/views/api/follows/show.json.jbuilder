json.follow do 
    json.extract! @follow, :id, :follower_id, :following_id, :status
end