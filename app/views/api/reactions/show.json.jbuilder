json.reaction do
    json.extract! @reaction, :id, :post_id, :user_id, :type_of_reaction
end