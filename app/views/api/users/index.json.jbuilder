@users.each do |user|
    json.set! user.id do 
        json.extract! user, :id, :username, :name, :created_at, :post_ids, :following_ids, :follower_ids
        json.profile_picture_url user.profile_picture.url
        # json.profile_picture_url "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
    end
end