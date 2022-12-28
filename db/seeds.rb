# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    # These `destroy_all` commands are not necessary if you use `rails
    # db:seed:replant`
    puts "Destroying tables..."
    User.destroy_all
    Post.destroy_all
    Comment.destroy_all
    Reaction.destroy_all
    Follow.destroy_all
  
    # Reset the id (i.e., primary key) counters for each table to start at 1
    # (helpful for debugging)
    puts "Resetting id sequences..."
    %w(users posts comments reactions follows).each do |table_name|
      ApplicationRecord.connection.reset_pk_sequence!(table_name)
    end
  
    # Create seed data
    puts "Seeding the DB..."

    puts "Creating users..."


    User.create!(
        username: "Demo-lition", 
        email: "demo@user.io", 
        password: "password",
        name: "Demo User"
    )

    matthew = User.create!(username: "birdwatcher", password_digest: "whatever", session_token: "1", name: "Matthew Goodpub", email: "matthew@gmail.com", bio: "I love bird watching")
    diego = User.create!(username: "dsnovaes", password_digest: "whatever", session_token: "2", name: "Diego Novaes", email: "dsnovaes1@gmail.com", bio: "Founder of BubbleGram")
    elon = User.create!(username: "elonmusk", password_digest: "whatever", session_token: "3", name: "Elon Musk", email: "elon@tesla.com", bio: "I might buy BubbleGram")
    disnee = User.create!(username: "disney", password_digest: "whatever", session_token: "4", name: "Disney World", email: "disnee@appacademy.io", bio: "", private_profile: true)
    coding_memes = User.create!(username: "coding_memes", password_digest: "whatever", session_token: "5", name: "Coding Memes", email: "codingmemes@appacademy.io", bio: "The best coding memes")
    john_mayer = User.create!(username: "johnmayer", password_digest: "whatever", session_token: "6", name: "John Mayer", email: "johnmayer@appacademy.io", bio: "Singer, songwriter, and guitarist")

    puts "Creating posts"
    post1_matthew = Post.create!(user_id: matthew.id)
    post2_matthew = Post.create!(user_id: matthew.id)
    post3_matthew = Post.create!(user_id: matthew.id)

    post1_diego = Post.create!(user_id: diego.id)
    post2_diego = Post.create!(user_id: diego.id)

    post1_john = Post.create!(user_id: john_mayer.id, caption: "Hello from the studio… I know it’s been a while since I’ve updated you on what’s next, and since many of you have asked when the next leg of touring is, I thought I’d share my thoughts and intentions for the future. I love touring and will continue to play live shows, but in staying open to what’s driving me creatively, it felt like making more music was the most inspired feeling I had. I know the Sob Rock tour was only in the US, and though I will make it to other cities and countries in the future, I’ve just got more songs to make. I’m having the time of my life writing and recording, and it won’t be long before I share some very exciting news about some new projects. I’m grateful beyond description for all the love and support I’ve got in you all, and I’m the luckiest person in the world to still be on this big beautiful ride with you all. ♥️ (photos by @daniel)")
    post2_john = Post.create!(user_id: john_mayer.id, caption: "\“You’re gonna have to give him a moment, son. John Mayer has to think about his whole life before he plays.\” (photo by @candytman)")
    post3_john = Post.create!(user_id: john_mayer.id, caption: "Here is a nice photo someone took of me this evening. I hope you’re enjoying what’s left of summer.")
    post4_john = Post.create!(user_id: john_mayer.id, caption: "\“Cause a little bit of summer…\” Announcing Rise For The River, three great-big-very-small-shows in Livingston, MT to support a county greatly impacted by flooding and the resulting closure of the Yellowstone Park entrance that the local economy relies on. I’m blown away by the generosity of my friends @bobweir and @davechappelle and can’t wait to celebrate this awesome community with those who share my love for it. Don’t be mad if the tickets sell out (they may be gone by the time you read this) but do text \“Flood22\” to 41444 if you care to contribute. Head to johnmayer.com for tickets.")
    post5_john = Post.create!(user_id: john_mayer.id, caption: "These tours with @deadandcompany exist on an almost otherworldly plane - everyone, on stage and in the crowd, meets up in this shared dream, and on the last night, after the final note is struck, we leave it all on the stage. We bow, we hug, we share our love for one another and then… we disappear. I fly through the dead of night and wake up at home, where my ears ring, my heart sings, and I’m left with this mix of fatigue, joy, accomplishment, and deep appreciation for what I was able to be a part of. I can feel the connected, collective experience of thousands of others who wake up feeling the same. I’ll never get over the profound beauty and uniqueness of this, and we’ll never in our lifetime see the likes of @bobweir @mickeyhart and @billkreutzmann, playing beyond all perceived limitations and expectations. It’s nothing short of remarkable. Thank you one and all for allowing me a seat on this transcendent ride. ♥️")

    post1_coding_memes = Post.create!(user_id: coding_memes.id)
    post2_coding_memes = Post.create!(user_id: coding_memes.id)
    post3_coding_memes = Post.create!(user_id: coding_memes.id)
    post4_coding_memes = Post.create!(user_id: coding_memes.id)
    post5_coding_memes = Post.create!(user_id: coding_memes.id)
    post6_coding_memes = Post.create!(user_id: coding_memes.id)
    post7_coding_memes = Post.create!(user_id: coding_memes.id)
    post8_coding_memes = Post.create!(user_id: coding_memes.id)
    post9_coding_memes = Post.create!(user_id: coding_memes.id)
    post10_coding_memes = Post.create!(user_id: coding_memes.id)
    post11_coding_memes = Post.create!(user_id: coding_memes.id)
    post12_coding_memes = Post.create!(user_id: coding_memes.id)
    post13_coding_memes = Post.create!(user_id: coding_memes.id)
    post14_coding_memes = Post.create!(user_id: coding_memes.id)
    post15_coding_memes = Post.create!(user_id: coding_memes.id)
    
    puts "Creating following relations"
    Follow.create!(follower_id: 1, following_id: diego.id, status: "accepted")
    Follow.create!(follower_id: 1, following_id: elon.id, status: "accepted")
    Follow.create!(follower_id: 1, following_id: coding_memes.id, status: "accepted")
    Follow.create!(follower_id: 2, following_id: matthew.id, status: "accepted")
    Follow.create!(follower_id: 2, following_id: elon.id, status: "accepted")
    Follow.create!(follower_id: 2, following_id: disnee.id)
    Follow.create!(follower_id: 2, following_id: coding_memes.id, status: "accepted")
    Follow.create!(follower_id: 2, following_id: john_mayer.id, status: "accepted")
    Follow.create!(follower_id: 3, following_id: coding_memes.id, status: "accepted")
    Follow.create!(follower_id: 3, following_id: john_mayer.id, status: "accepted")
    Follow.create!(follower_id: 4, following_id: matthew.id, status: "accepted")
    Follow.create!(follower_id: 4, following_id: diego.id, status: "accepted")

    puts "Creating comments"
    [post1_matthew.id, post2_matthew.id, post3_matthew.id].each do |post|
        Comment.create!(post_id: post, user_id: elon.id, body: "Watch this bird: twitter.com")
    end

    [
        post1_matthew.id,
        post2_matthew.id,
        post3_matthew.id,
        post1_diego.id,
        post2_diego.id,
        post1_john.id,
        post2_john.id,
        post3_john.id,
        post4_john.id,
        post5_john.id,
        post1_coding_memes.id, 
        post2_coding_memes.id, 
        post3_coding_memes.id,
        post4_coding_memes.id, 
        post5_coding_memes.id, 
        post6_coding_memes.id, 
        post7_coding_memes.id,
        post8_coding_memes.id, 
        post9_coding_memes.id, 
        post10_coding_memes.id,
        post11_coding_memes.id, 
        post12_coding_memes.id, 
        post13_coding_memes.id, 
        post14_coding_memes.id,
        post15_coding_memes.id
    ].each do |post|
        Comment.create!(post_id: post, user_id: diego.id, body: "LOL")
        Comment.create!(post_id: post, user_id: disnee.id, body: "Those memes remind me of the best co-hort ever (crying emoji)")
    end

    Comment.create!(post_id: post1_john.id, user_id: diego.id, body: "Awesome!")

    puts "Creating reactions"
    [
        post1_coding_memes.id, 
        post2_coding_memes.id, 
        post3_coding_memes.id,
        post4_coding_memes.id, 
        post5_coding_memes.id, 
        post6_coding_memes.id, 
        post7_coding_memes.id,
        post8_coding_memes.id, 
        post9_coding_memes.id, 
        post10_coding_memes.id,
        post11_coding_memes.id, 
        post12_coding_memes.id, 
        post13_coding_memes.id, 
        post14_coding_memes.id,
        post15_coding_memes.id
    ].each do |post|
        Reaction.create!(post_id: post, user_id: matthew.id)
        Reaction.create!(post_id: post, user_id: diego.id)
        Reaction.create!(post_id: post, user_id: disnee.id)
        Reaction.create!(post_id: post, user_id: elon.id)

    end

    puts "Done!"
  end