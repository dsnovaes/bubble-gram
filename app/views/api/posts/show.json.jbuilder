json.post do
    json.extract! @post, :id, :user_id, :caption, :created_at, :reaction_ids, :comment_ids
end
@related.each do|post|
    json.related do 
        json.set! post.id do  
            json.extract! post, :id, :user_id, :caption
        end
    end
end
json.user do
    json.extract! @user, :id, :username, :name
end