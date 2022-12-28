# recieves aaaallll the posts
@posts.each do |post|
    json.set! post.id do 
        unless post.user.private_profile # and filter here
            json.extract! post, :id, :media_url, :comment_ids, :reaction_ids
        end
    end
end