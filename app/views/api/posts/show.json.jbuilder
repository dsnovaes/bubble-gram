json.post do
    json.extract! @post, :id, :user_id, :caption
end