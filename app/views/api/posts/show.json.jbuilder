json.post do
    json.extract! @post, :id, :user_id, :caption
end
@related.each do|post|
    json.related do 
        json.set! post.id do  
            json.extract! post, :id, :user_id, :caption
        end
    end
end