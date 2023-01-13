require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do
    # These "destroy_all" commands are not necessary if you use "rails
    # db:seed:replant"
    puts "Destroying tables..."
    Post.destroy_all
    Comment.destroy_all
    Reaction.destroy_all
    Follow.destroy_all
    User.destroy_all
  
    # Reset the id (i.e., primary key) counters for each table to start at 1
    # (helpful for debugging)
    puts "Resetting id sequences..."
    %w(users posts comments reactions follows).each do |table_name|
      ApplicationRecord.connection.reset_pk_sequence!(table_name)
    end
  
    # Create seed data
    puts "Seeding the DB..."
    puts "Creating users..."

    demo = User.create!(
        username: "demo-user", 
        email: "demo@user.io", 
        password: "password",
        name: "Demo User"
    )
    demo.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/demo-logo.jpeg"), filename: "demo-logo.jpeg")
    diego = User.create!(username: "dsnovaes", password: "whatever", name: "Diego Novaes", email: "dsnovaes1@gmail.com", bio: "Founder of BubbleGram")
    diego.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{diego.username}.jpg"), filename: "#{diego.username}.jpg")
    elon = User.create!(username: "elonmusk", password: "whatever", name: "Elon Musk", email: "elon@tesla.com", bio: "Elon Musk Is 👇\n\nCEO - SpaceX 🚀,Tesla 🚘\n\nFounder - The Boring Company 🛣\n\nCo-Founder - Neuralink, OpenAI 🤖🦾\n\nThis is a fan page ! 🌾")
    elon.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{elon.username}.jpeg"), filename: "#{elon.username}.jpeg")
    codingmemes = User.create!(username: "codingmemes", password: "whatever", name: "Coding Memes", email: "codingmemes@appacademy.io", bio: "The best coding memes")
    codingmemes.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{codingmemes.username}.jpeg"), filename: "#{codingmemes.username}.jpeg")
    johnmayer = User.create!(username: "johnmayer", password: "whatever", name: "John Mayer", email: "johnmayer@appacademy.io", bio: "Singer, songwriter, and guitarist")
    johnmayer.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{johnmayer.username}.jpeg"), filename: "#{johnmayer.username}.jpeg")
    petemurray = User.create!(username: "petemurray", password: "whatever", name: "Pete Murray", email: "petemurray@appacademy.io", bio: "Pete Murray, Best Of Tour: On sale 30/11 at my website!")
    petemurray.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{petemurray.username}.jpeg"), filename: "#{petemurray.username}.jpeg")
    archdigest =  User.create!(username: "archdigest", password: "whatever", name: "Architectural Digest", email: "archdigest@appacademy.io", bio: "The International Design Authority.")
    archdigest.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{archdigest.username}.jpeg"), filename: "#{archdigest.username}.jpeg")
    titta =  User.create!(username: "titta", password: "dogdog", name: "Titta", email: "titta@appacademy.io", bio: "4yo, Jack Russel Terrier")
    titta.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/titta_profile.jpeg"), filename: "titta_profile.jpg")
    pele =  User.create!(username: "pele", password: "bestofalltimes", name: "Pelé", email: "pele@appacademy.io", bio: "Brazilian | #10\n3x World Cup Champion\nLeading Goal Scorer of All Time (1,283)\nFIFA Football Player of the Century\nGlobal Ambassador and Humanitarian")
    pele.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{pele.username}.jpeg"), filename: "#{pele.username}.jpeg")
    momo =  User.create!(username: "momo", password: "whatever", name: "Momo Mochi Lam-Hufford", email: "momo@appacademy.io", bio: "Helpful alarm clock. Must be fed on time. Talkative and love to chew things. Will sit on your back or shoulders.. but only if I love you.")
    momo.profile_picture.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{momo.username}.jpg"), filename: "#{momo.username}.jpg")

    puts "Creating posts"
    
    post12_pele = Post.create!(caption: "Only 100 days until the start of the World Cup! I can't wait to cheer on the Brazilian team in this great football show. Hexa, we’re coming for you!", user_id: pele.id)
    post12_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele12.jpg"), filename: "pele12.jpg")
    post2_elon = Post.create!(user_id: elon.id, caption: "Ready to burn Tesla's valuation")
    post2_elon.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/flame.jpeg"), filename: "flame.jpeg")
    post4_titta = Post.create!(caption: "Sleepy puppy", user_id: titta.id)
    post4_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/puppy.jpg"), filename: "puppy.jpg")
    post5_titta = Post.create!(caption: "They see me rolling... sleeping..", user_id: titta.id)
    
    post4_archdigest = Post.create!(caption: "“When you see it, the house reads as effortless, as if it was designed in a single doodle,” says #AD100 architect @bjarkeingels of this Danish home. “In the end, it’s a very simple house that produces a lot of different experiences and surprises.” Those include epic sunrises and occasional blankets of fog, as clouds roll in across the terrain. The one spot where the looping form overlaps itself, meanwhile, gave way to a sculptural staircase, with a tear-shaped skylight above that coaxes precious Scandinavian sun into both levels.\n\nTake a tour of the one of a kind, nature-surrounded abode at our bio link. Photo by @pernilleloof and @thomasloof; styling by @pernille.vest; design and architecture by @big_builds; words by @samuelcochran.", user_id: archdigest.id)
    post4_archdigest.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/archdigest4.jpeg"), filename: "archdigest4.jpeg")

    post7_diego = Post.create!(user_id: diego.id)
    post7_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/street.jpg"), filename: "street.jpg")

    post3_titta = Post.create!(caption: "Windy day", user_id: titta.id)
    post3_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/windy.jpg"), filename: "windy.jpg")
    post1_john = Post.create!(user_id: johnmayer.id, caption: "Hello from the studio… I know it’s been a while since I’ve updated you on what’s next, and since many of you have asked when the next leg of touring is, I thought I’d share my thoughts and intentions for the future. I love touring and will continue to play live shows, but in staying open to what’s driving me creatively, it felt like making more music was the most inspired feeling I had. I know the Sob Rock tour was only in the US, and though I will make it to other cities and countries in the future, I’ve just got more songs to make. I’m having the time of my life writing and recording, and it won’t be long before I share some very exciting news about some new projects. I’m grateful beyond description for all the love and support I’ve got in you all, and I’m the luckiest person in the world to still be on this big beautiful ride with you all. ♥️ (photos by @daniel)")
    post1_john.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/hello.jpeg"), filename: "hello.jpeg")
    
    post3_elon = Post.create!(user_id: elon.id)
    post3_elon.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/weed.jpeg"), filename: "weed.jpeg")
    
    post6_john = Post.create!(user_id: johnmayer.id, caption: "Atlanta night two: it’s the joy of my life, now having enough songs to spread out over two nights of music and *still* wishing we’d gotten to play even more. Thank you for keeping these tunes alive…. ♥️")
    post6_john.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/atlanta.jpeg"), filename: "atlanta.jpeg")
    
    post2_john = Post.create!(user_id: johnmayer.id, caption: "\“You’re gonna have to give him a moment, son. John Mayer has to think about his whole life before he plays.\” (photo by @candytman)")
    post2_john.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/candytman.jpeg"), filename: "candytman.jpeg")
    
    post2_titta = Post.create!(caption: "Excuse, sir. Could you please turn the heater on?", user_id: titta.id)
    post2_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/cold.jpg"), filename: "cold.jpg")
    post10_pele = Post.create!(caption: "Football is joy. It's a dance. It's more than that. It's a real party. Although, unfortunately, racism still exists, we will not allow that to stop us from continuing to smile. And we will continue to fight racism every day in this way: fighting for our right to be happy and respected. #BailaViniJr", user_id: pele.id)
    post10_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele10.jpg"), filename: "pele10.jpg")

    post2_archdigest = Post.create!(caption: "#AD100 designer @raymanboozer, founder of interiors company @apartment48, loves pretty rooms. For this project, a brownstone on New York’s Upper East Side, he wanted to open up the space with vivid colors and interesting textures while highlighting the lovely outdoor garden. “Having a pretty room is really important to me. I always want it to be pretty while also being something that you can relax in,” he says.\n\nPeek inside the colorful city abode at our bio link. Photo by @gievesanderson; design by @apartment48; words by @jay_nailah.", user_id: archdigest.id)
    post2_archdigest.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/archdigest2.jpeg"), filename: "archdigest2.jpeg")

    post2_pele = Post.create!(caption: "Today, football continues to tell its story, as always, in an enthralling way. Messi winning his first World Cup, as his trajectory deserved. My dear friend, Mbappé, scoring four goals in a final. What a gift it was to watch this spectacle to the future of our sport. And I couldn't fail to congratulate Morocco for the incredible campaign. It's great to see Africa shine. Congratulations Argentina! Certainly Diego is smiling now.", user_id: pele.id)
    post2_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele02.jpg"), filename: "pele02.jpg")
    
    post6_diego = Post.create!(user_id: diego.id, caption: "Union Square")
    post6_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/unionsquare.jpg"), filename: "unionsquare.jpg")
    
    post6_titta = Post.create!(caption: "Mirror, mirror on the wall, who's the cutest one of all?", user_id: titta.id)
    post6_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/mirror.jpg"), filename: "mirror.jpg")

    post8_diego = Post.create!(user_id: diego.id, caption: "Bay of All Saints - Salvador, Bahia, Brazil")
    post8_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/praiadabarra.jpg"), filename: "praiadabarra.jpg")

    post5_john = Post.create!(user_id: johnmayer.id, caption: "These tours with @deadandcompany exist on an almost otherworldly plane - everyone, on stage and in the crowd, meets up in this shared dream, and on the last night, after the final note is struck, we leave it all on the stage. We bow, we hug, we share our love for one another and then… we disappear. I fly through the dead of night and wake up at home, where my ears ring, my heart sings, and I’m left with this mix of fatigue, joy, accomplishment, and deep appreciation for what I was able to be a part of. I can feel the connected, collective experience of thousands of others who wake up feeling the same. I’ll never get over the profound beauty and uniqueness of this, and we’ll never in our lifetime see the likes of @bobweir @mickeyhart and @billkreutzmann, playing beyond all perceived limitations and expectations. It’s nothing short of remarkable. Thank you one and all for allowing me a seat on this transcendent ride. ♥️")
    post5_john.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/thesetours.jpeg"), filename: "thesetours.jpeg")
    post8_titta = Post.create!(caption: "I may lose the match, but I don't skip the nap", user_id: titta.id)
    post8_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/uno.jpg"), filename: "uno.jpg")
    
    post1_elon = Post.create!(user_id: elon.id, caption: "Happy New Year 🎆🎊")
    post1_elon.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/newyear.jpeg"), filename: "newyear.jpeg")
    
    post1_pele = Post.create!(caption: "Inspiration and love marked the journey of King Pelé, who peacefully passed away today. On his journey, Edson enchanted the world with his genius in sport, stopped a war, carried out social works all over the world and spread what he most believed to be the cure for all our problems: love.\n\nHis message today becomes a legacy for future generations.\n\nLove, love and love, forever.", user_id: pele.id)
    post1_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele01.jpg"), filename: "pele01.jpg")
    post5_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/wheel.jpg"), filename: "wheel.jpg")

    post9_diego = Post.create!(user_id: diego.id, caption: "Rio de Janeiro, Brazil")
    post9_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/rio.jpg"), filename: "rio.jpg")

    post5_pele = Post.create!(caption: "In 1958, in Sweden, I was walking through the streets thinking about fulfilling the promise I made to my father. I know that many of the national team made similar promises and are also looking for their first World Cup.\n\nI want to inspire you, my friends. I'll watch the game from here at the hospital and I'll be rooting for each one of you. We are on this journey together. Good luck to our Brazil!", user_id: pele.id)
    post1_titta = Post.create!(caption: "Me and my best friend, Peppa", user_id: titta.id)
    post1_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/peppa.jpeg"), filename: "peppa.jpeg")
    post5_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele05.jpg"), filename: "pele05.jpg")
    post6_pele = Post.create!(caption: "Hello from Brazil! I hope you're all enjoying watching the games at the World Cup as much as I am. I love fútbol so deeply and I also love it for how it helps and empowers children through fun, teamwork, and creativity. That's the reason why I started Pelé Foundation and why I'm delighted to announce that we are establishing our first ever Three Hearts Awards, which will recognize a player, non profit organization and an inspiration annually, who has had a significant contribution, commitment to philanthropy, and community impact that aids and empowers children through educational, anti-poverty or health efforts.\n\nIt’s my pleasure to announce this years honorees will be @grassrootsoccer for their leadership in adolescent health over the past 20 years, @cristiano for his excellence on and off the field highlighted by his endless commitment to children’s causes, and @globalempowermentmission, for their inspirational work helping Ukrainian refugees.\n\nAs today is Giving Tuesday, join me in celebrating this year’s honorees for their amazing work using fútbol to change the world!", user_id: pele.id)
    post6_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele06.jpg"), filename: "pele06.jpg")
    
    post1_diego = Post.create!(user_id: diego.id, caption: "Bay Bridge")
    post1_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/baybridge.jpg"), filename: "baybridge.jpg")

    post7_titta = Post.create!(caption: "I love watching the sunset with my human friend", user_id: titta.id)
    post7_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/sunset.jpg"), filename: "sunset.jpg")
    post7_pele = Post.create!(caption: "I was only a kid back in 1958 but I remember it like it was yesterday. It’s always been my greatest honour to represent Brasil but to do it so in the biggest competition on the planet, score important goals and eventually lift the trophy… it was a dream come true!\n\nMy official @rootsoffight collection has just added this new blue sweatsuit, inspired by the blue jerseys we wore in the 1958 final!\n\nCheck it out at rootsoffight.com and use code BLACKFRIDAY10 for an extra 10% off everything.\n\n#RootsofFight #KnowYourRoots", user_id: pele.id)
    post7_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele07.jpg"), filename: "pele07.jpg")

    post3_archdigest = Post.create!(caption: "Ten years ago, Ruchi Sanghvi (@rsanghvi) and Aditya Agarwal (@adityaag82)— two software engineers and venture investors —embarked on a journey to find the perfect lot to build their dream home. Somewhere along the way, Sanghvi underwent a complete volte-face on her aesthetic predilections. 'I was an extreme modernist when we started. But my perspective changed. I went from being a minimalist to a maximalist,' recalls the Silicon Valley pioneer. Ultimately, the home devised by the couple and their design team—architect John Maniscalco (@john_maniscalco_architecture), #AD100 interiors firm @the.archers.inc, and landscape maven Bernard Trainor (@groundstudiolandscape)—brokers a nuanced rapprochement between the twin poles of taste.\n\nTake a full tour of the San Francisco abode at our bio link. Photo by @samfroststudio; styling by @michaelreynoldsnyc; interior design by @the.archers.inc; architecture by @john_maniscalco_architecture; landscape design by @groundstudiolandscape; words by @mayer.rus.", user_id: archdigest.id)
    post3_archdigest.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/archdigest3.jpeg"), filename: "archdigest3.jpeg")

    post9_titta = Post.create!(caption: "Ha-ha-ha, very funny, Diego", user_id: titta.id)
    post9_titta.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/barata.jpg"), filename: "barata.jpg")
    post8_pele = Post.create!(caption: "The last time I wore the shirt of the Brazilian team we inaugurated the three stars above the crest, now we have five. I can't wait to add the 6th star.", user_id: pele.id)
    post8_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele08.jpg"), filename: "pele08.jpg")
    
    post2_diego = Post.create!(user_id: diego.id, caption: "Happiness never decreases from being shared")
    post2_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/happiness.jpg"), filename: "happiness.jpg")
    
    post9_pele = Post.create!(caption: "I remember when there were only a few days left before my first World Cup. I still didn't know how big this would be. It was the beginning of a great journey. Will we live another beautiful story this year?", user_id: pele.id)
    post9_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele09.jpg"), filename: "pele09.jpg")
    post4_john = Post.create!(user_id: johnmayer.id, caption: "\“Cause a little bit of summer…\” Announcing Rise For The River, three great-big-very-small-shows in Livingston, MT to support a county greatly impacted by flooding and the resulting closure of the Yellowstone Park entrance that the local economy relies on. I’m blown away by the generosity of my friends @bobweir and @davechappelle and can’t wait to celebrate this awesome community with those who share my love for it. Don’t be mad if the tickets sell out (they may be gone by the time you read this) but do text \“Flood22\” to 41444 if you care to contribute. Head to johnmayer.com for tickets.")
    post4_john.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/cause.jpeg"), filename: "cause.jpeg")
    
    post3_diego = Post.create!(user_id: diego.id, caption: "The day I wore a jacket in Florida (St. Augustine)")
    post3_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/staugustine.jpg"), filename: "staugustine.jpg")
    
    post1_archdigest = Post.create!(caption: "Tyson Strang and Tatiana Baibabaeva of @terra_coll_home never imagined that they would relocate from New York City to Mallorca full-time, let alone that the move would spark an interior-design career. But the Balearic fates had surprises in store for this creative couple. After a 2015 home exchange introduced them to the agrarian heart of the island, the duo dreamed of a local summer escape, eventually buying a finca to make their own. “Our first job was to strip everything that wasn’t old and beautiful in our eyes,” recalls Strang of the farmhouse, which dates back an estimated 300 years but had undergone some insensitive changes in recent decades. “We kept anything timeworn.”\n\nExplore the beautifully revived Mallorca home at the link in our bio. Photo by @salvalopez; design by @terra_coll_home; words by @samuelcochran.", user_id: archdigest.id)
    post1_archdigest.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/archdigest1.jpeg"), filename: "archdigest1.jpeg")

    post11_pele = Post.create!(caption: "My dear friend, @rogerfederer. The decision to stop doing what we love is always a tough one. However, we can always find peace knowing we gave our best in every challenge we faced through times. I can only imagine how hard this day was for you. Be it for the love of your fans, for the games or for the friends you made along the way, your journey made an impact in the world. You are, and will always be, an idol.", user_id: pele.id)
    post11_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele11.jpg"), filename: "pele11.jpg")
    
    post3_john = Post.create!(user_id: johnmayer.id, caption: "Here is a nice photo someone took of me this evening. I hope you’re enjoying what’s left of summer.")
    post3_john.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/hereis.jpeg"), filename: "hereis.jpeg")
    
    (1..12).each do |number|
        post = Post.create!(user_id: momo.id)
        uri = "https://bubblegram-dev.s3.us-west-1.amazonaws.com/momo"
        uri += number.to_s
        uri += ".jpeg"
        filename = uri.split("/")[-1]
        post.media.attach(io: URI.open(uri), filename: filename)
    end

    post4_diego = Post.create!(user_id: diego.id, caption: "San Francisco Sunset")
    post4_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/sunset_sf.jpg"), filename: "sunset_sf.jpg")
    
    post3_pele = Post.create!(caption: "Carta aberta sobre o meu sonho\n\nA vida é oportunidade. O que fazemos com ela cabe a cada um de nós. Acertamos e erramos. Na vitória, recebemos a celebração. Na derrota, o aprendizado. A vida sempre é generosa e oferece novos recomeços. A cada dia que passa, iniciamos um novo caminho. E neste ciclo, alimentamos sonhos que nunca morrem, independente dos tropeços da jornada.\n\nIsso serve para todo mundo, mas quando o seu sonho é ser jogador de futebol, as oportunidades são muito mais raras e os sonhos muito mais longínquos. Já os tropeços não são mais doloridos que o da vida de ninguém. Porém, são julgados por muito mais pessoas, não acha? E, para ser justo, as vitórias são muito mais celebradas também.\n\nApesar da dor que estamos sentindo com a nossa eliminação na Copa do Mundo, eu peço aos brasileiros que se lembrem do que nos trouxe até as cinco primeiras estrelas que temos no peito. É o amor que nos move.\n\nEu não sei o que nos faz sermos tão loucos por futebol. Se é o amor pela união de amizades verdadeiras em torno do esporte, pelo grito do gol ou por esquecer de todos os problemas que enfrentamos, mesmo que seja por apenas 90 minutos. Talvez o amor pelo combate à pobreza, à fome e às drogas, que o futebol assume em tantas comunidades que formam um país tão imenso. São muitas as virtudes do esporte mais bonito. Ainda mais aqui no Brasil.\n\nNão importa o motivo. O que importa é que essa torcida nos uniu, em um momento que precisávamos tanto de união. E meu sonho é que este sentimento entre nós e pelo nosso país não seja apenas passageiro. Este objetivo pode parecer impossível. Porém, quando eu era garoto, eu tive outro sonho que também parecia: vencer a Copa do Mundo para o meu pai.\n\nFalando em sonhos, não pensem que os sonhos dos nossos atletas acabaram. Eu sei que eles ainda sonham com a sexta estrela, assim como eu sonhava quando era um menino. A nossa conquista foi apenas adiada.\n\nAos meus amigos atletas e comissão técnica da Seleção, eu deixo a minha admiração, solidariedade e amor. A todos os brasileiros, eu desejo que a união e o amor que nos une no esporte transcenda para a vida inteira. O sonho é de todos nós. Amor, amor e amor.", user_id: pele.id)
    post3_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele03.jpg"), filename: "pele03.jpg")
    
    (1..15).each do |number|
        post = Post.create!(user_id: codingmemes.id)
        uri = "https://bubblegram-dev.s3.us-west-1.amazonaws.com/codingmemes"
        uri += number.to_s
        uri += ".jpeg"
        filename = uri.split("/")[-1]
        post.media.attach(io: URI.open(uri), filename: filename)
    end

    post5_diego = Post.create!(user_id: diego.id, caption: "Meeting our advisor")
    post5_diego.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/meeting.jpg"), filename: "meeting.jpg")
    
    post4_pele = Post.create!(caption: "Eu te vi crescer, torci por você todos os dias e finalmente posso lhe parabenizar por igualar meu número de gols com a Seleção Brasileira. Nós dois sabemos que isso é muito mais do que um número. O nosso maior dever, como atletas, é inspirar. Inspirar nossos colegas de profissão de hoje, as próximas gerações e, acima de tudo, inspirar todos que amam o nosso esporte.\n\nInfelizmente o dia não é o mais feliz para nós, mas você sempre será a fonte de inspiração que muitos almejam se tornar. Eu aprendi que quanto mais o tempo passa, mais o nosso legado cresce. Meu recorde foi estabelecido há quase 50 anos, e ninguém tinha conseguido se aproximar dele até agora. Você chegou lá, garoto. Isso valoriza a grandeza da sua conquista, @neymarjr.\nPorém, você sabe, assim como eu, que nenhum número é maior que a alegria de representar nosso país. Tenho 82 anos, e depois de tanto tempo, espero ter lhe inspirado de alguma forma para chegar tão longe. Mais que isso, espero que a sua conquista contagie as milhões de pessoas que te seguem a desafiarem o que parece impossível.\n\nO seu legado está longe de chegar ao fim. Continue nos inspirando. Eu continuarei dando socos no ar de felicidade com cada gol que você fizer, como fiz em todas as partidas que vi você em campo.", user_id: pele.id)
    post4_pele.media.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/pele04.jpg"), filename: "pele04.jpg")
    
    puts "Creating following relations"
    Follow.create!(follower_id: demo.id, following_id: diego.id, status: "accepted")
    Follow.create!(follower_id: titta.id, following_id: elon.id, status: "accepted")
    Follow.create!(follower_id: demo.id, following_id: codingmemes.id, status: "accepted")
    Follow.create!(follower_id: titta.id, following_id: codingmemes.id, status: "accepted")
    Follow.create!(follower_id: demo.id, following_id: johnmayer.id, status: "accepted")
    Follow.create!(follower_id: demo.id, following_id: archdigest.id, status: "accepted")

    User.all.each do |user|
        Follow.create!(follower_id: diego.id, following_id: user.id, status: "accepted") unless user.id == diego.id
    end

    # momo and titta friendship
    Follow.create!(follower_id: momo.id, following_id: titta.id, status: "accepted")
    titta.posts.each_with_index do |post,i|
        Reaction.create!(post_id: post.id, user_id: momo.id) if i.even?
    end
    titta.posts.each_with_index do |post,i|
        Comment.create!(post_id: post.id, user_id: momo.id, body: "Hi Titta, would you be my friend?") unless i.even?
    end

    puts "Creating comments"
    codingmemes.posts.each_with_index do |post,i|
        Comment.create!(post_id: post.id, user_id: diego.id, body: "LOL")
        Comment.create!(post_id: post.id, user_id: elon.id, body: "I like this network. I might buy it.") unless i.even?
    end

    johnmayer.posts.each_with_index do |post,i|
        Comment.create!(post_id: post.id, user_id: diego.id, body: "Awesome!") if i%3==0
    end

    puts "Creating reactions"
    Post.all.each_with_index do |post,i|
        Reaction.create!(post_id: post.id, user_id: elon.id) if i%4==0
        Reaction.create!(post_id: post.id, user_id: diego.id) if i%3==0
        Reaction.create!(post_id: post.id, user_id: petemurray.id) if i%6==0
        Reaction.create!(post_id: post.id, user_id: codingmemes.id) if i%5==0
    end

    puts "Done!"
#   end