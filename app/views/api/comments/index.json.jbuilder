@comments.each do |comment|
    json.set! comment.id do 
        json.extract! comment, :id, :user_id, :post_id, :body, :created_at, :updated_at
        json.user do
            json.username comment.user.username
            json.id comment.user.id
            # json.profile_picture_url comment.user.profile_picture.url
            json.profile_picture_url "http://localhost:3000/static/media/baybridge.803ace97d00338843cfc.jpg"
        end
    end
end