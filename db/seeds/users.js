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
          knex('users').insert({ firstname: 'Alice', lastname: 'Wonderland', email: 'alice@wonderland.com', password: 'bumbum', cookie: 'word', createDate: '2016-01-08 04:05:06 -5:00' }),
          knex('users').insert({ firstname: 'Ben', lastname: 'Felangy', email: 'bdawg@wonderland.com', password: 'bantin', cookie: 'drow', createDate: '2016-06-01 04:05:06 -5:00' }),
          knex('users').insert({ firstname: 'Chip', lastname: 'Flavio', email: 'flavouredchips@wonderland.com', password: 'lays', cookie: 'crunch', createDate: '2016-09-11 04:05:06 -5:00' })
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
          knex('deck').insert({name: 'Deck1', userId: 1, genreId: 1, createDate: '2016-06-01 04:05:06 -5:00'}),
          knex('deck').insert({name: 'Deck2', userId: 2, genreId: 2, createDate: '2016-06-01 04:05:06 -5:00'}),
          knex('deck').insert({name: 'Deck3', userId: 3, genreId: 3, createDate: '2016-06-01 04:05:06 -5:00'})
        ]);
      });
  }


  function seedSlidesTable() {
    return knex('slides').del()
      .then(function() {
        return Promise.all([
          knex('slides').insert({question: 'Question1', genreId: 1, deckId: 1, pictureUrl: 'over', slideAnswerId: "UWl7bbg.p~=Wm^R"}),
          knex('slides').insert({question: 'Question2', genreId: 1, deckId: 1, pictureUrl: 'here', slideAnswerId: "hM$QScVm}EUoJ-E"}),
          knex('slides').insert({question: 'Question3', genreId: 2, deckId: 2, pictureUrl: 'overThere', slideAnswerId: "$,rrkcV0U@I3R}."}),
          knex('slides').insert({question: 'Question4', genreId: 3, deckId: 3, pictureUrl: 'overThere', slideAnswerId: "BQz2a-$+%CzlYvV"})
        ]);
      });
  }

  function seedAnswerTable() {
    return knex('answer').del()
      .then(function() {
        return Promise.all([
          knex('answer').insert({answer: 'answer1', correctAnswer: 'false', deckId: 1, slideAnswerId: "UWl7bbg.p~=Wm^R"}),
          knex('answer').insert({answer: 'answer2', correctAnswer: 'true', deckId: 1, slideAnswerId: "UWl7bbg.p~=Wm^R"}),
          knex('answer').insert({answer: 'answer3', correctAnswer: 'false', deckId: 1, slideAnswerId: "UWl7bbg.p~=Wm^R"}),
          knex('answer').insert({answer: 'answer4', correctAnswer: 'false', deckId: 1, slideAnswerId: "UWl7bbg.p~=Wm^R"}),
          knex('answer').insert({answer: 'answer1', correctAnswer: 'false', deckId: 1, slideAnswerId: "hM$QScVm}EUoJ-E"}),
          knex('answer').insert({answer: 'answer2', correctAnswer: 'true', deckId: 1, slideAnswerId: "hM$QScVm}EUoJ-E"}),
          knex('answer').insert({answer: 'answer3', correctAnswer: 'false', deckId: 1, slideAnswerId: "hM$QScVm}EUoJ-E"}),
          knex('answer').insert({answer: 'answer4', correctAnswer: 'false', deckId: 1, slideAnswerId: "hM$QScVm}EUoJ-E"})
        ]);
      });
  }

  function seedUserDeckScoreTable() {
    return knex('userdeckscore').del()
      .then(function() {
        return Promise.all([
          knex('userdeckscore').insert({ userId: 1, correctAnswerCount: 5, deckId: 1 }),
          knex('userdeckscore').insert({ userId: 2, correctAnswerCount: 9, deckId: 2 }),
          knex('userdeckscore').insert({ userId: 3, correctAnswerCount: 7, deckId: 3 })
        ]);
      });
  }


};
