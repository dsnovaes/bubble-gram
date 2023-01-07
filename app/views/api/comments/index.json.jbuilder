@comments.each do |comment|
    json.set! comment.id do 
        json.extract! comment, :id, :post_id, :body, :created_at
        json.user do
            json.username comment.user.username
            json.profile_picture_url comment.user.profile_picture.url
        end
    end
end