require "open-uri"

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
        username: "Demo-lition", 
        email: "demo@user.io", 
        password: "password",
        name: "Demo User"
    )
    demo.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{demo.username}.jpeg`), filename: `#{demo.username}.jpeg`)

    diego = User.create!(username: "dsnovaes", password: "whatever", name: "Diego Novaes", email: "dsnovaes1@gmail.com", bio: "Founder of BubbleGram")
    diego.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{diego.username}.jpg`), filename: `#{diego.username}.jpeg`)
    elon = User.create!(username: "elonmusk", password: "whatever", name: "Elon Musk", email: "elon@tesla.com", bio: "Elon Musk Is 👇\n\nCEO - SpaceX 🚀,Tesla 🚘\n\nFounder - The Boring Company 🛣\n\nCo-Founder - Neuralink, OpenAI 🤖🦾\n\nThis is a fan page ! 🌾")
    elon.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{elon.username}.jpeg`), filename: `#{elon.username}.jpeg`)
    codingmemes = User.create!(username: "codingmemes", password: "whatever", name: "Coding Memes", email: "codingmemes@appacademy.io", bio: "The best coding memes")
    codingmemes.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{codingmemes.username}.jpeg`), filename: `#{codingmemes.username}.jpeg`)
    johnmayer = User.create!(username: "johnmayer", password: "whatever", name: "John Mayer", email: "johnmayer@appacademy.io", bio: "Singer, songwriter, and guitarist")
    johnmayer.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{johnmayer.username}.jpeg`), filename: `#{johnmayer.username}.jpeg`)
    petemurray = User.create!(username: "petemurray", password: "whatever", name: "Pete Murray", email: "petemurray@appacademy.io", bio: "Pete Murray, Best Of Tour: On sale 30/11 at my website!")
    petemurray.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{petemurray.username}.jpeg`), filename: `#{petemurray.username}.jpeg`)
    archdigest =  User.create!(username: "archdigest", password: "whatever", name: "Architectural Digest", email: "archdigest@appacademy.io", bio: "The International Design Authority.")
    archdigest.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{archdigest.username}.jpeg`), filename: `#{archdigest.username}.jpeg`)
    titta =  User.create!(username: "titta", password: "dogdog", name: "Titta", email: "titta@appacademy.io", bio: "4yo, Jack Russel Terrier")
    titta.profilePictureUrl.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/kiyftirjrk60cu23eix7ooc6xwf8?response-content-disposition=inline%3B%20filename%3D%22titta_profile.jpeg%22%3B%20filename%2A%3DUTF-8%27%27titta_profile.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAREVK3H5BEDCK6UKG%2F20230104%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T163012Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=a75dbed7a60c18283d9e6ab2cc32ac71dc905ec02eacb32fc3d037c298394887"), filename: "titta_profile.jpg")
    pele =  User.create!(username: "pele", password: "bestofalltimes", name: "Pelé", email: "pele@appacademy.io", bio: "Brazilian | #10\n3x World Cup Champion\nLeading Goal Scorer of All Time (1,283)\nFIFA Football Player of the Century\nGlobal Ambassador and Humanitarian")
    pele.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{pele.username}.jpeg`), filename: `#{pele.username}.jpeg`)
    momo =  User.create!(username: "momo", password: "whatever", name: "Momo Mochi Lam-Hufford", email: "momo@appacademy.io", bio: "Helpful alarm clock. Must be fed on time. Talkative and love to chew things. Will sit on your back or shoulders.. but only if I love you.")
    momo.profilePictureUrl.attach(io: URI.open(`https://bubblegram-dev.s3.us-west-1.amazonaws.com/#{momo.username}.jpg`), filename: `#{momo.username}.jpg`)

    puts "Creating posts"

    post1_elon = Post.create!(user_id: elon.id, caption: "Happy New Year 🎆🎊")
    post1_elon.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/newyear.jpeg"), filename: "newyear.jpeg")
    post2_elon = Post.create!(user_id: elon.id)
    post2_elon.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/flame.jpeg"), filename: "flame.jpeg")

    post1_john = Post.create!(user_id: johnmayer.id, caption: "Hello from the studio… I know it’s been a while since I’ve updated you on what’s next, and since many of you have asked when the next leg of touring is, I thought I’d share my thoughts and intentions for the future. I love touring and will continue to play live shows, but in staying open to what’s driving me creatively, it felt like making more music was the most inspired feeling I had. I know the Sob Rock tour was only in the US, and though I will make it to other cities and countries in the future, I’ve just got more songs to make. I’m having the time of my life writing and recording, and it won’t be long before I share some very exciting news about some new projects. I’m grateful beyond description for all the love and support I’ve got in you all, and I’m the luckiest person in the world to still be on this big beautiful ride with you all. ♥️ (photos by @daniel)")
    post1_john.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/hello.jpeg"), filename: "hello.jpeg")
    post2_john = Post.create!(user_id: johnmayer.id, caption: "\“You’re gonna have to give him a moment, son. John Mayer has to think about his whole life before he plays.\” (photo by @candytman)")
    post2_john.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/candytman.jpeg"), filename: "candytman.jpeg")
    post3_john = Post.create!(user_id: johnmayer.id, caption: "Here is a nice photo someone took of me this evening. I hope you’re enjoying what’s left of summer.")
    post3_john.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/hereis.jpeg"), filename: "hereis.jpeg")
    post4_john = Post.create!(user_id: johnmayer.id, caption: "\“Cause a little bit of summer…\” Announcing Rise For The River, three great-big-very-small-shows in Livingston, MT to support a county greatly impacted by flooding and the resulting closure of the Yellowstone Park entrance that the local economy relies on. I’m blown away by the generosity of my friends @bobweir and @davechappelle and can’t wait to celebrate this awesome community with those who share my love for it. Don’t be mad if the tickets sell out (they may be gone by the time you read this) but do text \“Flood22\” to 41444 if you care to contribute. Head to johnmayer.com for tickets.")
    post4_john.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/cause.jpeg"), filename: "cause.jpeg")
    post5_john = Post.create!(user_id: johnmayer.id, caption: "These tours with @deadandcompany exist on an almost otherworldly plane - everyone, on stage and in the crowd, meets up in this shared dream, and on the last night, after the final note is struck, we leave it all on the stage. We bow, we hug, we share our love for one another and then… we disappear. I fly through the dead of night and wake up at home, where my ears ring, my heart sings, and I’m left with this mix of fatigue, joy, accomplishment, and deep appreciation for what I was able to be a part of. I can feel the connected, collective experience of thousands of others who wake up feeling the same. I’ll never get over the profound beauty and uniqueness of this, and we’ll never in our lifetime see the likes of @bobweir @mickeyhart and @billkreutzmann, playing beyond all perceived limitations and expectations. It’s nothing short of remarkable. Thank you one and all for allowing me a seat on this transcendent ride. ♥️")
    post5_john.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/thesetours.jpeg"), filename: "thesetours.jpeg")
    post6_john = Post.create!(user_id: johnmayer.id, caption: "Atlanta night two: it’s the joy of my life, now having enough songs to spread out over two nights of music and *still* wishing we’d gotten to play even more. Thank you for keeping these tunes alive…. ♥️")
    post6_john.media.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/atlanta.jpeg"), filename: "atlanta.jpeg")

    post1_titta = Post.create!(caption: "Me and my best friend, Peppa", user_id: titta.id)
    post1_titta.attach(io: URI.open("https://bubblegram-dev.s3.us-west-1.amazonaws.com/tuanwy23j7l5xkx7bo1o7tqs2s78?response-content-disposition=inline%3B%20filename%3D%22titta.jpeg%22%3B%20filename%2A%3DUTF-8%27%27titta.jpeg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAREVK3H5BEDCK6UKG%2F20230104%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230104T163012Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8f1321738812426f51e7a338f1279fb12899e4c5fe13c07a823cb30ae634d4c0"), filename: "peppa.jpeg")
    post2_titta = Post.create!(caption: "Much better to turn into a cold dog, than a hot dog", user_id: titta.id)
    post2_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/cold.jpg"), filename: "cold.jpg")
    post3_titta = Post.create!(caption: "Windy", user_id: titta.id)
    post3_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/windy.jpg"), filename: "windy.jpg")
    post4_titta = Post.create!(caption: "Sleepy puppy", user_id: titta.id)
    post4_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/puppy.jpg"), filename: "puppy.jpg")
    post5_titta = Post.create!(caption: "Does any one have some Red Bull?", user_id: titta.id)
    post5_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/wheel.jpg"), filename: "wheel.jpg")
    post6_titta = Post.create!(caption: "Mirror, mirror on the wall, who's the cutest one of all?", user_id: titta.id)
    post6_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/mirror.jpg"), filename: "mirror.jpg")
    post7_titta = Post.create!(caption: "I love watching the sunset with my human friend", user_id: titta.id)
    post7_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/sunset.jpg"), filename: "sunset.jpg")
    post8_titta = Post.create!(caption: "I lose the match, but I don't lose the nap", user_id: titta.id)
    post8_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/uno.jpg"), filename: "uno.jpg")
    post9_titta = Post.create!(caption: "Ha-ha-ha, very funny, Diego", user_id: titta.id)
    post9_titta.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/barata.jpg"), filename: "barata.jpg")
    
    post1_pele = Post.create!(caption: "A inspiração e o amor marcaram a jornada de Rei Pelé, que pacificamente faleceu no dia de hoje. Em sua jornada, Edson encantou todos com sua genialidade no esporte, parou uma guerra, fez obras sociais no mundo inteiro e espalhou o que mais acreditava ser a cura para todos os nossos problemas: o amor.\n\nA sua mensagem em vida se transforma em legado para as futuras gerações.\n\nAmor, amor e amor, para sempre.\n\nInspiration and love marked the journey of King Pelé, who peacefully passed away today. On his journey, Edson enchanted the world with his genius in sport, stopped a war, carried out social works all over the world and spread what he most believed to be the cure for all our problems: love.\n\nHis message today becomes a legacy for future generations.\n\nLove, love and love, forever.", user_id: pele.id)
    post1_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele01.jpg"), filename: "pele01.jpg")
    post2_pele = Post.create!(caption: "Hoje o futebol continuou a narrar a sua história, como sempre, de forma apaixonante. @leomessi vencendo sua primeira Copa do Mundo, como era merecido por sua trajetória. Meu querido amigo, @k.mbappe, marcando quatro gols em uma final. Que presente foi assistir a este espetáculo ao futuro do nosso esporte. E não poderia deixar de parabenizar ao Marrocos, pela campanha incrível. É muito bom ver a África brilhar. Parabéns, Argentina! Certamente Diego está sorrindo agora.\n\nToday, football continues to tell its story, as always, in an enthralling way. Messi winning his first World Cup, as his trajectory deserved. My dear friend, Mbappé, scoring four goals in a final. What a gift it was to watch this spectacle to the future of our sport. And I couldn't fail to congratulate Morocco for the incredible campaign. It's great to see Africa shine. Congratulations Argentina! Certainly Diego is smiling now.", user_id: pele.id)
    post2_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele02.jpg"), filename: "pele02.jpg")
    post3_pele = Post.create!(caption: "Carta aberta sobre o meu sonho\n\nA vida é oportunidade. O que fazemos com ela cabe a cada um de nós. Acertamos e erramos. Na vitória, recebemos a celebração. Na derrota, o aprendizado. A vida sempre é generosa e oferece novos recomeços. A cada dia que passa, iniciamos um novo caminho. E neste ciclo, alimentamos sonhos que nunca morrem, independente dos tropeços da jornada.\n\nIsso serve para todo mundo, mas quando o seu sonho é ser jogador de futebol, as oportunidades são muito mais raras e os sonhos muito mais longínquos. Já os tropeços não são mais doloridos que o da vida de ninguém. Porém, são julgados por muito mais pessoas, não acha? E, para ser justo, as vitórias são muito mais celebradas também.\n\nApesar da dor que estamos sentindo com a nossa eliminação na Copa do Mundo, eu peço aos brasileiros que se lembrem do que nos trouxe até as cinco primeiras estrelas que temos no peito. É o amor que nos move.\n\nEu não sei o que nos faz sermos tão loucos por futebol. Se é o amor pela união de amizades verdadeiras em torno do esporte, pelo grito do gol ou por esquecer de todos os problemas que enfrentamos, mesmo que seja por apenas 90 minutos. Talvez o amor pelo combate à pobreza, à fome e às drogas, que o futebol assume em tantas comunidades que formam um país tão imenso. São muitas as virtudes do esporte mais bonito. Ainda mais aqui no Brasil.\n\nNão importa o motivo. O que importa é que essa torcida nos uniu, em um momento que precisávamos tanto de união. E meu sonho é que este sentimento entre nós e pelo nosso país não seja apenas passageiro. Este objetivo pode parecer impossível. Porém, quando eu era garoto, eu tive outro sonho que também parecia: vencer a Copa do Mundo para o meu pai.\n\nFalando em sonhos, não pensem que os sonhos dos nossos atletas acabaram. Eu sei que eles ainda sonham com a sexta estrela, assim como eu sonhava quando era um menino. A nossa conquista foi apenas adiada.\n\nAos meus amigos atletas e comissão técnica da Seleção, eu deixo a minha admiração, solidariedade e amor. A todos os brasileiros, eu desejo que a união e o amor que nos une no esporte transcenda para a vida inteira. O sonho é de todos nós. Amor, amor e amor.", user_id: pele.id)
    post3_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele03.jpg"), filename: "pele03.jpg")
    post4_pele = Post.create!(caption: "Eu te vi crescer, torci por você todos os dias e finalmente posso lhe parabenizar por igualar meu número de gols com a Seleção Brasileira. Nós dois sabemos que isso é muito mais do que um número. O nosso maior dever, como atletas, é inspirar. Inspirar nossos colegas de profissão de hoje, as próximas gerações e, acima de tudo, inspirar todos que amam o nosso esporte.\n\nInfelizmente o dia não é o mais feliz para nós, mas você sempre será a fonte de inspiração que muitos almejam se tornar. Eu aprendi que quanto mais o tempo passa, mais o nosso legado cresce. Meu recorde foi estabelecido há quase 50 anos, e ninguém tinha conseguido se aproximar dele até agora. Você chegou lá, garoto. Isso valoriza a grandeza da sua conquista, @neymarjr.\nPorém, você sabe, assim como eu, que nenhum número é maior que a alegria de representar nosso país. Tenho 82 anos, e depois de tanto tempo, espero ter lhe inspirado de alguma forma para chegar tão longe. Mais que isso, espero que a sua conquista contagie as milhões de pessoas que te seguem a desafiarem o que parece impossível.\n\nO seu legado está longe de chegar ao fim. Continue nos inspirando. Eu continuarei dando socos no ar de felicidade com cada gol que você fizer, como fiz em todas as partidas que vi você em campo.", user_id: pele.id)
    post4_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele04.jpg"), filename: "pele04.jpg")
    post5_pele = Post.create!(caption: "Em 1958, na Suécia, eu caminhava pelas ruas pensando em cumprir a promessa que fiz ao meu pai. Sei que muitos da Seleção fizeram promessas parecidas e também vão em busca da sua primeira Copa do Mundo.\n\nEu quero inspirar vocês, meus amigos. Assistirei ao jogo daqui do hospital e estarei torcendo muito por cada um de vocês. Estamos juntos nessa caminhada. Boa sorte ao nosso Brasil!\n\nIn 1958, in Sweden, I was walking through the streets thinking about fulfilling the promise I made to my father. I know that many of the national team made similar promises and are also looking for their first World Cup.\n\nI want to inspire you, my friends. I'll watch the game from here at the hospital and I'll be rooting for each one of you. We are on this journey together. Good luck to our Brazil!", user_id: pele.id)
    post5_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele05.jpg"), filename: "pele05.jpg")
    post6_pele = Post.create!(caption: "Eu espero que vocês estejam gostando de assistir os jogos da Copa do Mundo tanto quanto eu. Eu sou apaixonado por futebol e amo o quanto ele ajuda a empoderar crianças através da diversão, trabalho em equipe e criatividade. Esta é a razão pela qual eu comecei a Fundação Pelé e hoje estou animado de poder contar para vocês estamos anunciando os vencedores do primeiro Prêmio Três Corações, que honram um jogador, uma ONG e uma inspiração. Os vencedores contribuem para causas filantrópicas e impactam a sociedade através do apoio e empoderamento de crianças por esforços educacionais, de saúde e contra a vulnerabilidade social.\n\nÉ um grande prazer anunciar que os vencedores deste ano são @grassrootsoccer , por sua liderança na promoção de saúde dos adolescentes nos últimos 20 anos; @cristiano , por sua excelência nos campos e fora deles, num esforço interminável pelas crianças; e a @globalempowermentmission , por seu trabalho excepcional ajudando refugiados ucranianos.\n\nComo hoje é Giving Tuesday, juntem-se a mim celebrando os vencedores por seu incrível trabalho com futebol que muda o mundo!\n\n-\n\nHello from Brazil! I hope you're all enjoying watching the games at the World Cup as much as I am. I love fútbol so deeply and I also love it for how it helps and empowers children through fun, teamwork, and creativity. That's the reason why I started Pelé Foundation and why I'm delighted to announce that we are establishing our first ever Three Hearts Awards, which will recognize a player, non profit organization and an inspiration annually, who has had a significant contribution, commitment to philanthropy, and community impact that aids and empowers children through educational, anti-poverty or health efforts.\n\nIt’s my pleasure to announce this years honorees will be @grassrootsoccer for their leadership in adolescent health over the past 20 years, @cristiano for his excellence on and off the field highlighted by his endless commitment to children’s causes, and @globalempowermentmission, for their inspirational work helping Ukrainian refugees.\n\nAs today is Giving Tuesday, join me in celebrating this year’s honorees for their amazing work using fútbol to change the world!", user_id: pele.id)
    post6_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele06.jpg"), filename: "pele06.jpg")
    post7_pele = Post.create!(caption: "Eu era apenas uma criança em 1958, mas me lembro como se fosse ontem. Sempre foi minha maior honra representar o Brasil, mas fazer isso na maior competição do planeta, marcar gols importantes e eventualmente levantar o troféu… foi um sonho realizado!\n\nMinha coleção oficial do @rootsoffight acaba de adicionar este novo moletom azul, inspirado nas camisas azuis que usamos na final de 1958!\n\nConfira em rootsoffight.com e use o código BLACKFRIDAY10 para 10% de desconto extra em tudo.\n\n#RootsofFight #KnowYourRoots\n\n.\n\nI was only a kid back in 1958 but I remember it like it was yesterday. It’s always been my greatest honour to represent Brasil but to do it so in the biggest competition on the planet, score important goals and eventually lift the trophy… it was a dream come true!\n\nMy official @rootsoffight collection has just added this new blue sweatsuit, inspired by the blue jerseys we wore in the 1958 final!\n\nCheck it out at rootsoffight.com and use code BLACKFRIDAY10 for an extra 10% off everything.\n\n#RootsofFight #KnowYourRoots", user_id: pele.id)
    post7_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele07.jpg"), filename: "pele07.jpg")
    post8_pele = Post.create!(caption: "Na última vez que eu usei a camisa da seleção brasileira nós inauguramos as três estrelas sobre o escudo, agora já temos cinco. Mal posso esperar para ver essa camisa com seis estrelas.\n\n.\n\nThe last time I wore the shirt of the Brazilian team we inaugurated the three stars above the crest, now we have five. I can't wait to add the 6th star.", user_id: pele.id)
    post8_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele08.jpg"), filename: "pele08.jpg")
    post9_pele = Post.create!(caption: "Eu me lembro de quando faltavam poucos dias antes da minha primeira Copa do Mundo. Eu ainda não sabia a dimensão que isso teria. Era o início de uma grande jornada. Será que viveremos mais uma linda história este ano?\n\n.\n\nI remember when there were only a few days left before my first World Cup. I still didn't know how big this would be. It was the beginning of a great journey. Will we live another beautiful story this year?", user_id: pele.id)
    post9_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele09.jpg"), filename: "pele09.jpg")
    post10_pele = Post.create!(caption: "O futebol é alegria. É uma dança. É mais que isso. É uma verdadeira festa. Apesar de que, infelizmente, o racismo ainda exista, não permitiremos que isso nos impeça de continuar sorrindo. E nós continuaremos combatendo o racismo todos os dias desta forma: lutando pelo nosso direito de sermos felizes e respeitados. #BailaViniJr\n\n.\n\nFootball is joy. It's a dance. It's more than that. It's a real party. Although, unfortunately, racism still exists, we will not allow that to stop us from continuing to smile. And we will continue to fight racism every day in this way: fighting for our right to be happy and respected. #BailaViniJr", user_id: pele.id)
    post10_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele10.jpg"), filename: "pele10.jpg")
    post11_pele = Post.create!(caption: "Meu amigo, @rogerfederer. Deixar de fazer o que mais amamos sempre é uma decisão difícil. Porém, encontramos a paz quando temos certeza que demos o máximo de nós a cada desafio que enfrentamos. Imagino que este é um dia difícil para você. Seja pelo amor aos fãs, pelo jogo e pelos grandes amigos que encontrou no caminho. Sua jornada marcou a todos. Você é, e sempre será, um ídolo.\n\n.\n\nMy dear friend, @rogerfederer. The decision to stop doing what we love is always a tough one. However, we can always find peace knowing we gave our best in every challenge we faced through times. I can only imagine how hard this day was for you. Be it for the love of your fans, for the games or for the friends you made along the way, your journey made an impact in the world. You are, and will always be, an idol.", user_id: pele.id)
    post11_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele11.jpg"), filename: "pele11.jpg")
    post12_pele = Post.create!(caption: "Faltam apenas 100 dias para o início da Copa do Mundo! Mal posso esperar para vibrar com a Seleção Brasileira neste grande espetáculo do futebol. Que venha o Hexa!\n\n.\n\nOnly 100 days until the start of the World Cup! I can't wait to cheer on the Brazilian team in this great football show. Hexa, we’re coming for you!", user_id: pele.id)
    post12_pele.attach(io: File.open("/Users/diegonovaes/Dropbox/appAcademy/bubblegram/frontend/src/assets/pele12.jpg"), filename: "pele12.jpg")


    (1..12).each do |number|
        post = Post.create!(user_id: momo.id)
        uri = "https://bubblegram-dev.s3.us-west-1.amazonaws.com/momo"
        uri += number.to_s
        uri += ".jpeg"
        filename = uri.split("/")[-1]
        post.attach(io: URI.open(uri), filename: filename)
    end


    puts "Creating following relations"
    Follow.create!(follower_id: 1, following_id: diego.id)
    Follow.create!(follower_id: 1, following_id: elon.id)
    Follow.create!(follower_id: 1, following_id: codingmemes.id)
    Follow.create!(follower_id: 2, following_id: matthew.id)
    Follow.create!(follower_id: 2, following_id: elon.id)
    Follow.create!(follower_id: 2, following_id: disnee.id)
    Follow.create!(follower_id: 2, following_id: codingmemes.id)
    Follow.create!(follower_id: 2, following_id: johnmayer.id)
    Follow.create!(follower_id: 3, following_id: codingmemes.id)
    Follow.create!(follower_id: 3, following_id: johnmayer.id)
    Follow.create!(follower_id: diego.id, following_id: disnee.id)
    Follow.create!(follower_id: 4, following_id: matthew.id)
    Follow.create!(follower_id: 4, following_id: diego.id)

    (1..User.all.length).each do |id|
        random = ""
        Follow.create!(follower_id: id, following_id: random)
    end

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
        post1_codingmemes.id, 
        post2_codingmemes.id, 
        post3_codingmemes.id,
        post4_codingmemes.id, 
        post5_codingmemes.id, 
        post6_codingmemes.id, 
        post7_codingmemes.id,
        post8_codingmemes.id, 
        post9_codingmemes.id, 
        post10_codingmemes.id,
        post11_codingmemes.id, 
        post12_codingmemes.id, 
        post13_codingmemes.id, 
        post14_codingmemes.id,
        post15_codingmemes.id
    ].each do |post|
        Comment.create!(post_id: post, user_id: diego.id, body: "LOL")
        Comment.create!(post_id: post, user_id: disnee.id, body: "Those memes remind me of the best co-hort ever (crying emoji)")
    end

    Comment.create!(post_id: post1_john.id, user_id: diego.id, body: "Awesome!")

    puts "Creating reactions"
    [
        post1_codingmemes.id, 
        post2_codingmemes.id, 
        post3_codingmemes.id,
        post4_codingmemes.id, 
        post5_codingmemes.id, 
        post6_codingmemes.id, 
        post7_codingmemes.id,
        post8_codingmemes.id, 
        post9_codingmemes.id, 
        post10_codingmemes.id,
        post11_codingmemes.id, 
        post12_codingmemes.id, 
        post13_codingmemes.id, 
        post14_codingmemes.id,
        post15_codingmemes.id
    ].each do |post|
        Reaction.create!(post_id: post, user_id: matthew.id)
        Reaction.create!(post_id: post, user_id: diego.id)
        Reaction.create!(post_id: post, user_id: disnee.id)
        Reaction.create!(post_id: post, user_id: elon.id)

    end

    puts "Done!"
  end