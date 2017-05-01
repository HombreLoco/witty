exports.seed = function(knex, Promise) {
  return seedUserTable()
  .then(seedGenreTable)
  .then(seedDeckTable)
  .then(seedSlidesTable)
  .then(seedAnswerTable)
  .then(seedUserDeckScoreTable);


  function seedUserTable() {
    return knex('users').del()
      .then(function() {
        return Promise.all([
          knex('users').insert({ firstname: 'Alice', lastname: 'Wonderland', email: 'alice@wonderland.com', password: 'bumbum', cookie: 'word', createDate: '2016-01-08 04:05:06 -5:00' })
          // knex('users').insert({ firstname: 'Ben', lastname: 'Felangy', email: 'bdawg@wonderland.com', password: 'bantin', cookie: 'drow', createDate: '2016-06-01 04:05:06 -5:00' }),
          // knex('users').insert({ firstname: 'Chip', lastname: 'Flavio', email: 'flavouredchips@wonderland.com', password: 'lays', cookie: 'crunch', createDate: '2016-09-11 04:05:06 -5:00' })
        ]);
      });
  }

  function seedGenreTable() {
    return knex('genre').del()
      .then(function() {
        return Promise.all([
          knex('genre').insert({ name: 'Genre1', description: 'This is genre 1' }),
          knex('genre').insert({ name: 'Genre2', description: 'This is genre 2' }),
          knex('genre').insert({ name: 'Genre3', description: 'This is genre 3' })
        ]);
      });
  }

  function seedDeckTable() {
    return knex('deck').del()
      .then(function() {
        return Promise.all([
          knex('deck').insert({name: 'Environment: Recycling', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/green-recycling-symbol.jpg"}),
          knex('deck').insert({name: 'Environment: Water', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/FreshWater.jpg"}),
          knex('deck').insert({name: 'Environment: Animals', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/animals.jpg"}),
          knex('deck').insert({name: 'Food: General', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/cheese.jpg"}),
          knex('deck').insert({name: 'Food: Chocolates', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/chocolateBar.jpg"}),
          knex('deck').insert({name: 'Food: Beverages', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/BeerWine.jpg"}),
          knex('deck').insert({name: 'Sports: General', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/sports.jpg"}),
          knex('deck').insert({name: 'Sports: NBA', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/nba.jpg"}),
          knex('deck').insert({name: 'Sports: Football (Soccer)', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/WorldCup01.jpg"}),
          knex('deck').insert({name: 'Developers: Cookies', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/web-development.jpg"}),
          knex('deck').insert({name: 'Developers: Random', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/HTTP.jpg"}),
          knex('deck').insert({name: 'Developers: Random2', userId: 1, createDate: '2016-06-01 04:05:06 -5:00', pictureUrl: "../userUpload/database.jpg"})
        ]);
      });
  }


  function seedSlidesTable() {
    return knex('slides').del()
      .then(function() {
        return Promise.all([
          knex('slides').insert({question: 'The amount of energy saved by recycling one glass bottle is equal to:', deckId: 1, pictureUrl: "../userUpload/Lightbulbs.jpg", slideAnswerId: "s1"}),
          knex('slides').insert({question: 'Every ton of paper recycled saves:', deckId: 1, pictureUrl: "../userUpload/trees.jpg", slideAnswerId: "s2"}),
          knex('slides').insert({question: 'What percentage of newspapers made in the UK are printed on recycled paper?', deckId: 1, pictureUrl: "../userUpload/Newspaper.jpg", slideAnswerId: "s3"}),
          knex('slides').insert({question: 'What percentage of Earth is covered in water?', deckId: 2, pictureUrl: "../userUpload/Earth.jpg", slideAnswerId: "s4"}),
          knex('slides').insert({question: 'Which of these countries has the largest amount of fresh water?', deckId: 2, pictureUrl: "../userUpload/FreshWater.jpg", slideAnswerId: "s5"}),
          knex('slides').insert({question: 'When water freezes it expands by:', deckId: 2, pictureUrl: "../userUpload/ice.jpg", slideAnswerId: "s6"}),
          knex('slides').insert({question: 'Which of these animals hold hands while they sleep?', deckId:3, pictureUrl: "../userUpload/animals.jpg", slideAnswerId: "s7"}),
          knex('slides').insert({question: 'Which of the following animals has 3 hearts?', deckId: 3, pictureUrl: "../userUpload/heart.jpg", slideAnswerId: "s8"}),
          knex('slides').insert({question: 'Ants can carry:', deckId: 3, pictureUrl: "../userUpload/ants.jpg", slideAnswerId: "s9"}),
          knex('slides').insert({question: 'What percentage of the earth’s surface is used to grow food?', deckId: 4, pictureUrl: "../userUpload/agriculturalLand.jpg", slideAnswerId: "s10"}),
          knex('slides').insert({question: 'How many flowers does a honeybee worker need to visit to produce 1 pound of honey?', deckId: 4, pictureUrl: "../userUpload/beeFlower.jpg", slideAnswerId: "s11"}),
          knex('slides').insert({question: 'Which of the following countries has the highest coffee consumption per capita?', deckId: 4, pictureUrl: "../userUpload/coffee.jpg", slideAnswerId: "s12"}),
          knex('slides').insert({question: 'In what year was the blue M&M first introduced?', deckId: 5, pictureUrl: "../userUpload/blue-mms.jpg", slideAnswerId: "s13"}),
          knex('slides').insert({question: 'Which of these is the world’s best selling chocolate bar?', deckId: 5, pictureUrl: "../userUpload/chocolateBar.jpg", slideAnswerId: "s14"}),
          knex('slides').insert({question: 'Which of these countries leads the world in cocoa production?', deckId: 5, pictureUrl: "../userUpload/cocoaPlant.jpg", slideAnswerId: "s15"}),
          knex('slides').insert({question: 'What popular soda beverage was originally developed as a mixer for whisky?', deckId: 6, pictureUrl: "../userUpload/whisky.jpg", slideAnswerId: "s16"}),
          knex('slides').insert({question: 'Which of these is the world’s most consumed drink?', deckId: 6, pictureUrl: "../userUpload/beverage.jpg", slideAnswerId: "s17"}),
          knex('slides').insert({question: 'What are the average calories in a glass of orange juice?', deckId: 6, pictureUrl: "../userUpload/orangeJuice.jpg", slideAnswerId: "s18"}),
          knex('slides').insert({question: 'Baseballs were originally made from:', deckId: 7, pictureUrl: "../userUpload/Baseball.jpg", slideAnswerId: "s19"}),
          knex('slides').insert({question: 'Which of the following is the most watched sport in the world?', deckId: 7, pictureUrl: "../userUpload/sports.jpg", slideAnswerId: "s20"}),
          knex('slides').insert({question: 'Who tops the list of athletes with most medals from the summer Olympic Games?', deckId: 7, pictureUrl: "../userUpload/olympics.jpg", slideAnswerId: "s21"}),
          knex('slides').insert({question: 'Which team won the most NBA championships?', deckId: 8, pictureUrl: "../userUpload/nba.jpg", slideAnswerId: "s22"}),
          knex('slides').insert({question: 'How many triple doubles did Russell Westbrook have in the 2016/2017 season?', deckId: 8, pictureUrl: "../userUpload/russellWestbrook.jpg", slideAnswerId: "s23"}),
          knex('slides').insert({question: 'Who has the most famous receding hairline in basketball?', deckId: 8, pictureUrl: "../userUpload/recedingHairline.jpg", slideAnswerId: "s24"}),
          knex('slides').insert({question: 'Which football team has won the most European titles?', deckId: 9, pictureUrl: "../userUpload/championsLeague.jpg", slideAnswerId: "s25"}),
          knex('slides').insert({question: 'Who currently holds the world record transfer fee in football (soccer)?', deckId: 9, pictureUrl: "../userUpload/pogba-ronaldo.jpg", slideAnswerId: "s26"}),
          knex('slides').insert({question: 'Which national team won the first World Cup in 1930?', deckId: 9, pictureUrl: "../userUpload/worldCup.jpg", slideAnswerId: "s27"}),
          knex('slides').insert({question: 'How do we prevent a user’s cookie from being stolen by a ‘man in the middle’?', deckId: 10, pictureUrl: "../userUpload/stealingCookies.jpg", slideAnswerId: "s28"}),
          knex('slides').insert({question: 'How does a server set a cookie on a client browser?', deckId: 10, pictureUrl: "../userUpload/cookies.jpg", slideAnswerId: "s29"}),
          knex('slides').insert({question: 'What if any are the access restrictions for Websites when dealing with cookies?', deckId: 10, pictureUrl: "../userUpload/deleteCookies.jpg", slideAnswerId: "s30"}),
          knex('slides').insert({question: 'What kind of information can be received by an Ajax request?', deckId: 11, pictureUrl: "../userUpload/developer.png", slideAnswerId: "s31"}),
          knex('slides').insert({question: 'Which of the following is NOT a primitive data type in JavaScript?', deckId: 11, pictureUrl: "../userUpload/code.jpeg", slideAnswerId: "s32"}),
          knex('slides').insert({question: 'What HTTP method is most commonly used in web forms to submit data from the client to the server?', deckId: 11, pictureUrl: "../userUpload/choosing-a-web-designer.jpg", slideAnswerId: "s33"}),
          knex('slides').insert({question: 'In a POST request, where are the parameters typically sent?', deckId: 12, pictureUrl: "../userUpload/laptop.jpg", slideAnswerId: "s34"}),
          knex('slides').insert({question: 'Which of the following is not a standard DOM event?', deckId: 12, pictureUrl: "../userUpload/webDevelopers.jpg", slideAnswerId: "s35"}),
          knex('slides').insert({question: 'How do you switch between databases in the MongoDB shell?', deckId: 12, pictureUrl: "../userUpload/database.jpg", slideAnswerId: "s36"})
        ]);
      });
  }

  function seedAnswerTable() {
    return knex('answer').del()
      .then(function() {
        return Promise.all([
          knex('answer').insert({answer: '4 hours of lightbulb energy', correctAnswer: 'true', deckId: 1, slideAnswerId: "s1"}),
          knex('answer').insert({answer: '1 hour of lightbulb energy', correctAnswer: 'false', deckId: 1, slideAnswerId: "s1"}),
          knex('answer').insert({answer: '7 hours of lightbulb energy', correctAnswer: 'false', deckId: 1, slideAnswerId: "s1"}),
          knex('answer').insert({answer: '24 hours of lightbulb energy', correctAnswer: 'false', deckId: 1, slideAnswerId: "s1"}),
          knex('answer').insert({answer: '40 trees', correctAnswer: 'false', deckId: 1, slideAnswerId: "s2"}),
          knex('answer').insert({answer: '2 trees', correctAnswer: 'false', deckId: 1, slideAnswerId: "s2"}),
          knex('answer').insert({answer: '17 trees', correctAnswer: 'true', deckId: 1, slideAnswerId: "s2"}),
          knex('answer').insert({answer: '9 trees', correctAnswer: 'false', deckId: 1, slideAnswerId: "s2"}),
          knex('answer').insert({answer: '100%', correctAnswer: 'true', deckId: 1, slideAnswerId: "s3"}),
          knex('answer').insert({answer: '75%', correctAnswer: 'false', deckId: 1, slideAnswerId: "s3"}),
          knex('answer').insert({answer: '50%', correctAnswer: 'false', deckId: 1, slideAnswerId: "s3"}),
          knex('answer').insert({answer: '25%', correctAnswer: 'false', deckId: 1, slideAnswerId: "s3"}),
          knex('answer').insert({answer: '70%', correctAnswer: 'true', deckId: 2, slideAnswerId: "s4"}),
          knex('answer').insert({answer: '50%', correctAnswer: 'false', deckId: 2, slideAnswerId: "s4"}),
          knex('answer').insert({answer: '60%', correctAnswer: 'false', deckId: 2, slideAnswerId: "s4"}),
          knex('answer').insert({answer: '80%', correctAnswer: 'false', deckId: 2, slideAnswerId: "s4"}),
          knex('answer').insert({answer: 'Russia', correctAnswer: 'false', deckId: 2, slideAnswerId: "s5"}),
          knex('answer').insert({answer: 'USA', correctAnswer: 'false', deckId: 2, slideAnswerId: "s5"}),
          knex('answer').insert({answer: 'Brazil', correctAnswer: 'true', deckId: 2, slideAnswerId: "s5"}),
          knex('answer').insert({answer: 'Canada', correctAnswer: 'false', deckId: 2, slideAnswerId: "s5"}),
          knex('answer').insert({answer: '15%', correctAnswer: 'false', deckId: 2, slideAnswerId: "s6"}),
          knex('answer').insert({answer: '9%', correctAnswer: 'true', deckId: 2, slideAnswerId: "s6"}),
          knex('answer').insert({answer: '12%', correctAnswer: 'false', deckId: 2, slideAnswerId: "s6"}),
          knex('answer').insert({answer: '3%', correctAnswer: 'false', deckId: 2, slideAnswerId: "s6"}),
          knex('answer').insert({answer: 'Sea Otters', correctAnswer: 'true', deckId: 3, slideAnswerId: "s7"}),
          knex('answer').insert({answer: 'Chimps', correctAnswer: 'false', deckId: 3, slideAnswerId: "s7"}),
          knex('answer').insert({answer: 'Beavers', correctAnswer: 'false', deckId: 3, slideAnswerId: "s7"}),
          knex('answer').insert({answer: 'Geckos', correctAnswer: 'false', deckId: 3, slideAnswerId: "s7"}),
          knex('answer').insert({answer: 'Panda', correctAnswer: 'false', deckId: 3, slideAnswerId: "s8"}),
          knex('answer').insert({answer: 'Whale', correctAnswer: 'false', deckId: 3, slideAnswerId: "s8"}),
          knex('answer').insert({answer: 'Kangaroo', correctAnswer: 'false', deckId: 3, slideAnswerId: "s8"}),
          knex('answer').insert({answer: 'Octopus', correctAnswer: 'true', deckId: 3, slideAnswerId: "s8"}),
          knex('answer').insert({answer: '3 times their weight', correctAnswer: 'false', deckId: 3, slideAnswerId: "s9"}),
          knex('answer').insert({answer: '10 times their weight', correctAnswer: 'false', deckId: 3, slideAnswerId: "s9"}),
          knex('answer').insert({answer: '20 times their weight', correctAnswer: 'true', deckId: 3, slideAnswerId: "s9"}),
          knex('answer').insert({answer: '33 times their weight', correctAnswer: 'false', deckId: 3, slideAnswerId: "s9"}),
          knex('answer').insert({answer: '25%', correctAnswer: 'false', deckId: 4, slideAnswerId: "s10"}),
          knex('answer').insert({answer: '34%', correctAnswer: 'false', deckId: 4, slideAnswerId: "s10"}),
          knex('answer').insert({answer: '11%', correctAnswer: 'true', deckId: 4, slideAnswerId: "s10"}),
          knex('answer').insert({answer: '13%', correctAnswer: 'false', deckId: 4, slideAnswerId: "s10"}),
          knex('answer').insert({answer: '50', correctAnswer: 'false', deckId: 4, slideAnswerId: "s11"}),
          knex('answer').insert({answer: '17,000', correctAnswer: 'false', deckId: 4, slideAnswerId: "s11"}),
          knex('answer').insert({answer: '100,000', correctAnswer: 'false', deckId: 4, slideAnswerId: "s11"}),
          knex('answer').insert({answer: '2 Million', correctAnswer: 'true', deckId: 4, slideAnswerId: "s11"}),
          knex('answer').insert({answer: 'Canada', correctAnswer: 'false', deckId: 4, slideAnswerId: "s12"}),
          knex('answer').insert({answer: 'Finland', correctAnswer: 'true', deckId: 4, slideAnswerId: "s12"}),
          knex('answer').insert({answer: 'Colombia', correctAnswer: 'false', deckId: 4, slideAnswerId: "s12"}),
          knex('answer').insert({answer: 'Brazil', correctAnswer: 'false', deckId: 4, slideAnswerId: "s12"}),
          knex('answer').insert({answer: '1987', correctAnswer: 'false', deckId: 5, slideAnswerId: "s13"}),
          knex('answer').insert({answer: '1995', correctAnswer: 'true', deckId: 5, slideAnswerId: "s13"}),
          knex('answer').insert({answer: '1998', correctAnswer: 'false', deckId: 5, slideAnswerId: "s13"}),
          knex('answer').insert({answer: '2001', correctAnswer: 'false', deckId: 5, slideAnswerId: "s13"}),
          knex('answer').insert({answer: 'Milka', correctAnswer: 'false', deckId: 5, slideAnswerId: "s14"}),
          knex('answer').insert({answer: "Reese's Peanut Butter Cups", correctAnswer: 'false', deckId: 5, slideAnswerId: "s14"}),
          knex('answer').insert({answer: 'Snickers', correctAnswer: 'true', deckId: 5, slideAnswerId: "s14"}),
          knex('answer').insert({answer: 'Cadbury Dairy Milk', correctAnswer: 'false', deckId: 5, slideAnswerId: "s14"}),
          knex('answer').insert({answer: 'Brazil', correctAnswer: 'false', deckId: 5, slideAnswerId: "s15"}),
          knex('answer').insert({answer: 'Nigeria', correctAnswer: 'false', deckId: 5, slideAnswerId: "s15"}),
          knex('answer').insert({answer: 'Indonesia', correctAnswer: 'false', deckId: 5, slideAnswerId: "s15"}),
          knex('answer').insert({answer: 'Ivory Coast', correctAnswer: 'true', deckId: 5, slideAnswerId: "s15"}),
          knex('answer').insert({answer: 'Pepsi', correctAnswer: 'false', deckId: 6, slideAnswerId: "s16"}),
          knex('answer').insert({answer: 'Coca Cola', correctAnswer: 'false', deckId: 6, slideAnswerId: "s16"}),
          knex('answer').insert({answer: 'Mountain Dew', correctAnswer: 'true', deckId: 6, slideAnswerId: "s16"}),
          knex('answer').insert({answer: 'Sprite', correctAnswer: 'false', deckId: 6, slideAnswerId: "s16"}),
          knex('answer').insert({answer: 'Coffee', correctAnswer: 'false', deckId: 6, slideAnswerId: "s17"}),
          knex('answer').insert({answer: 'Beer', correctAnswer: 'false', deckId: 6, slideAnswerId: "s17"}),
          knex('answer').insert({answer: 'Tea', correctAnswer: 'true', deckId: 6, slideAnswerId: "s17"}),
          knex('answer').insert({answer: 'Coca Cola', correctAnswer: 'false', deckId: 6, slideAnswerId: "s17"}),
          knex('answer').insert({answer: '45', correctAnswer: 'false', deckId: 6, slideAnswerId: "s18"}),
          knex('answer').insert({answer: '110', correctAnswer: 'true', deckId: 6, slideAnswerId: "s18"}),
          knex('answer').insert({answer: '10', correctAnswer: 'false', deckId: 6, slideAnswerId: "s18"}),
          knex('answer').insert({answer: '80', correctAnswer: 'false', deckId: 6, slideAnswerId: "s18"}),
          knex('answer').insert({answer: 'Snake skin', correctAnswer: 'false', deckId: 7, slideAnswerId: "s19"}),
          knex('answer').insert({answer: 'Horse foreskin', correctAnswer: 'true', deckId: 7, slideAnswerId: "s19"}),
          knex('answer').insert({answer: 'Crocodile skin', correctAnswer: 'false', deckId: 7, slideAnswerId: "s19"}),
          knex('answer').insert({answer: 'Turtle skin', correctAnswer: 'false', deckId: 7, slideAnswerId: "s19"}),
          knex('answer').insert({answer: 'Gymnastics', correctAnswer: 'false', deckId: 7, slideAnswerId: "s20"}),
          knex('answer').insert({answer: 'Football (Soccer)', correctAnswer: 'true', deckId: 7, slideAnswerId: "s20"}),
          knex('answer').insert({answer: 'Volleyball', correctAnswer: 'false', deckId: 7, slideAnswerId: "s20"}),
          knex('answer').insert({answer: 'Basketball', correctAnswer: 'false', deckId: 7, slideAnswerId: "s20"}),
          knex('answer').insert({answer: 'Michael Phelps - USA', correctAnswer: 'true', deckId: 7, slideAnswerId: "s21"}),
          knex('answer').insert({answer: 'Larisa Latynina - Soviet Union', correctAnswer: 'false', deckId: 7, slideAnswerId: "s21"}),
          knex('answer').insert({answer: 'Takashi Ono - Japan', correctAnswer: 'false', deckId: 7, slideAnswerId: "s21"}),
          knex('answer').insert({answer: 'Birgit Fischer - Germany', correctAnswer: 'false', deckId: 7, slideAnswerId: "s21"}),
          knex('answer').insert({answer: 'Boston Celtics', correctAnswer: 'true', deckId: 8, slideAnswerId: "s22"}),
          knex('answer').insert({answer: 'Golden State Warriors', correctAnswer: 'false', deckId: 8, slideAnswerId: "s22"}),
          knex('answer').insert({answer: 'Chicago Bulls', correctAnswer: 'false', deckId: 8, slideAnswerId: "s22"}),
          knex('answer').insert({answer: 'Miami Heat', correctAnswer: 'false', deckId: 8, slideAnswerId: "s22"}),
          knex('answer').insert({answer: '42', correctAnswer: 'true', deckId: 8, slideAnswerId: "s23"}),
          knex('answer').insert({answer: '22', correctAnswer: 'false', deckId: 8, slideAnswerId: "s23"}),
          knex('answer').insert({answer: '13', correctAnswer: 'false', deckId: 8, slideAnswerId: "s23"}),
          knex('answer').insert({answer: '46', correctAnswer: 'false', deckId: 8, slideAnswerId: "s23"}),
          knex('answer').insert({answer: 'Blake Griffin', correctAnswer: 'false', deckId: 8, slideAnswerId: "s24"}),
          knex('answer').insert({answer: 'James Harden', correctAnswer: 'false', deckId: 8, slideAnswerId: "s24"}),
          knex('answer').insert({answer: 'Lebron James', correctAnswer: 'true', deckId: 8, slideAnswerId: "s24"}),
          knex('answer').insert({answer: 'Derrick Rose', correctAnswer: 'false', deckId: 8, slideAnswerId: "s24"}),
          knex('answer').insert({answer: 'Juventus', correctAnswer: 'false', deckId: 9, slideAnswerId: "s25"}),
          knex('answer').insert({answer: 'Real Madrid', correctAnswer: 'true', deckId: 9, slideAnswerId: "s25"}),
          knex('answer').insert({answer: 'Bayern München', correctAnswer: 'false', deckId: 9, slideAnswerId: "s25"}),
          knex('answer').insert({answer: 'Barcelona', correctAnswer: 'false', deckId: 9, slideAnswerId: "s25"}),
          knex('answer').insert({answer: 'Cristiano Ronaldo', correctAnswer: 'false', deckId: 9, slideAnswerId: "s26"}),
          knex('answer').insert({answer: 'Lionel Messi', correctAnswer: 'false', deckId: 9, slideAnswerId: "s26"}),
          knex('answer').insert({answer: 'Paul Pogba', correctAnswer: 'true', deckId: 9, slideAnswerId: "s26"}),
          knex('answer').insert({answer: 'Gareth Bale', correctAnswer: 'false', deckId: 9, slideAnswerId: "s26"}),
          knex('answer').insert({answer: 'Brazil', correctAnswer: 'false', deckId: 9, slideAnswerId: "s27"}),
          knex('answer').insert({answer: 'England', correctAnswer: 'false', deckId: 9, slideAnswerId: "s27"}),
          knex('answer').insert({answer: 'Uruguay', correctAnswer: 'true', deckId: 9, slideAnswerId: "s27"}),
          knex('answer').insert({answer: 'Italy', correctAnswer: 'false', deckId: 9, slideAnswerId: "s27"}),
          knex('answer').insert({answer: 'Encrypt the cookie', correctAnswer: 'false', deckId: 10, slideAnswerId: "s28"}),
          knex('answer').insert({answer: 'Enable HTTPS for our site', correctAnswer: 'true', deckId: 10, slideAnswerId: "s28"}),
          knex('answer').insert({answer: 'Use a VPN', correctAnswer: 'false', deckId: 10, slideAnswerId: "s28"}),
          knex('answer').insert({answer: 'Use server-side session storage', correctAnswer: 'false', deckId: 10, slideAnswerId: "s28"}),
          knex('answer').insert({answer: 'The server sends cookie-data in the HTTP response header', correctAnswer: 'true', deckId: 10, slideAnswerId: "s29"}),
          knex('answer').insert({answer: 'The server sends cookie-data in the HTTP response body', correctAnswer: 'false', deckId: 10, slideAnswerId: "s29"}),
          knex('answer').insert({answer: 'The server sets cookie-data directly (without need for an HTTP response)', correctAnswer: 'false', deckId: 10, slideAnswerId: "s29"}),
          knex('answer').insert({answer: 'The server does not set the cookie, the client does', correctAnswer: 'false', deckId: 10, slideAnswerId: "s29"}),
          knex('answer').insert({answer: 'Any website domain can access any cookie', correctAnswer: 'false', deckId: 10, slideAnswerId: "s30"}),
          knex('answer').insert({answer: 'Only the website domain that created a cookie can access it', correctAnswer: 'true', deckId: 10, slideAnswerId: "s30"}),
          knex('answer').insert({answer: 'All cookies are private, not accessible to any website', correctAnswer: 'false', deckId: 10, slideAnswerId: "s30"}),
          knex('answer').insert({answer: 'The website domain that pays the most', correctAnswer: 'false', deckId: 10, slideAnswerId: "s30"}),
          knex('answer').insert({answer: 'JSON', correctAnswer: 'false', deckId: 11, slideAnswerId: "s31"}),
          knex('answer').insert({answer: 'HTML', correctAnswer: 'false', deckId: 11, slideAnswerId: "s31"}),
          knex('answer').insert({answer: 'Any text', correctAnswer: 'true', deckId: 11, slideAnswerId: "s31"}),
          knex('answer').insert({answer: 'JSON and HTML', correctAnswer: 'false', deckId: 11, slideAnswerId: "s31"}),
          knex('answer').insert({answer: 'Boolean', correctAnswer: 'false', deckId: 11, slideAnswerId: "s32"}),
          knex('answer').insert({answer: 'Number', correctAnswer: 'false', deckId: 11, slideAnswerId: "s32"}),
          knex('answer').insert({answer: 'Array', correctAnswer: 'true', deckId: 11, slideAnswerId: "s32"}),
          knex('answer').insert({answer: 'String', correctAnswer: 'false', deckId: 11, slideAnswerId: "s32"}),
          knex('answer').insert({answer: 'GET', correctAnswer: 'false', deckId: 11, slideAnswerId: "s33"}),
          knex('answer').insert({answer: 'POST', correctAnswer: 'true', deckId: 11, slideAnswerId: "s33"}),
          knex('answer').insert({answer: 'PUT', correctAnswer: 'false', deckId: 11, slideAnswerId: "s33"}),
          knex('answer').insert({answer: 'DELETE', correctAnswer: 'false', deckId: 11, slideAnswerId: "s33"}),
          knex('answer').insert({answer: 'In the request headers only', correctAnswer: 'false', deckId: 12, slideAnswerId: "s34"}),
          knex('answer').insert({answer: 'In the request body only', correctAnswer: 'true', deckId: 12, slideAnswerId: "s34"}),
          knex('answer').insert({answer: 'Mainly in the request headers, and sometimes the body', correctAnswer: 'false', deckId: 12, slideAnswerId: "s34"}),
          knex('answer').insert({answer: 'Mainly in the request body, and sometimes the headers', correctAnswer: 'false', deckId: 12, slideAnswerId: "s34"}),
          knex('answer').insert({answer: 'Drag', correctAnswer: 'false', deckId: 12, slideAnswerId: "s35"}),
          knex('answer').insert({answer: 'Click', correctAnswer: 'false', deckId: 12, slideAnswerId: "s35"}),
          knex('answer').insert({answer: 'Keydown', correctAnswer: 'false', deckId: 12, slideAnswerId: "s35"}),
          knex('answer').insert({answer: 'Refresh', correctAnswer: 'true', deckId: 12, slideAnswerId: "s35"}),
          knex('answer').insert({answer: 'open DATABASE_NAME', correctAnswer: 'false', deckId: 12, slideAnswerId: "s36"}),
          knex('answer').insert({answer: 'use DATABASE_NAME', correctAnswer: 'true', deckId: 12, slideAnswerId: "s36"}),
          knex('answer').insert({answer: 'connect DATABASE_NAME', correctAnswer: 'false', deckId: 12, slideAnswerId: "s36"}),
          knex('answer').insert({answer: '/c DATABASE_NAME', correctAnswer: 'false', deckId: 12, slideAnswerId: "s36"}),
        ]);
      });
  }

  function seedUserDeckScoreTable() {
    return knex('userdeckscore').del()
      .then(function() {
        return Promise.all([
          knex('userdeckscore').insert({ userId: 1, correctAnswerCount: 5, deckId: 1 }),
          knex('userdeckscore').insert({ userId: 1, correctAnswerCount: 7, deckId: 1 }),
          knex('userdeckscore').insert({ userId: 1, correctAnswerCount: 10, deckId: 1 }),
          knex('userdeckscore').insert({ userId: 2, correctAnswerCount: 9, deckId: 2 }),
          knex('userdeckscore').insert({ userId: 3, correctAnswerCount: 7, deckId: 3 })
        ]);
      });
  }


};
