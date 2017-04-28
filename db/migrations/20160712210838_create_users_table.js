exports.up = function(knex, Promise) {
return CreateAnswerTable();

// CreateUserDeckScoreTable()
//   .then(CreateUserTable)
//   .then(CreateAnswerTable)
//   .then(CreateGenreTable)
//   .then(CreateDeckTable)
//   .then(CreateSlidesTable);

  // .then(CreateDeckSlidesTable)



  function CreateUserDeckScoreTable() {
    return knex.schema.createTable('userdeckscore', function (table) {
      table.increments('id');
      table.integer('deckId');
      table.integer('userId');
      table.integer('correctAnswerCount');
    });
  }

  // function CreateDeckSlidesTable() {
  //   return knex.schema.createTable('deckSlides', function (table) {
  //     table.integer('deckId');
  //     table.integer('slideId');
  //   });
  // }

  function CreateUserTable() {
    return knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('firstname').notNullable();
      table.string('lastname').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.dateTime('createDate').notNullable();
      table.dateTime('updateDate');
      table.string('cookie');
    });
  }

  function CreateAnswerTable() {
    return knex.schema.createTable('answer', function (table) {
      table.increments('id');
      table.integer('slideId');
      table.integer('deckId');
      table.string('answer').notNullable();
      table.boolean('correctAnswer').notNullable();
      table.integer('effect');
    });
  }

  function CreateGenreTable() {
    return knex.schema.createTable('genre', function (table) {
      table.increments('id');
      // table.foreign('id').references('deck.genreId', 'slides.genreId');
      table.string('name').notNullable();
      table.text('description').notNullable();
    });
  }


  function CreateDeckTable() {
    return knex.schema.createTable('deck', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.integer('userId').notNullable();
      table.dateTime('createDate').notNullable();
      table.dateTime('updateDate');
      table.integer('genreId');
      table.foreign('genreId').references('genre.id');
      table.foreign('userId').references('users.id');
    });
  }

  function CreateSlidesTable() {
    return knex.schema.createTable('slides', function (table) {
      table.increments('id');
      table.string('question').notNullable();
      table.integer('genreId').notNullable();
      table.integer('deckId').notNullable();
      table.dateTime('createDate');
      table.dateTime('updateDate');
      table.string('pictureUrl');
      table.foreign('genreId').references('genre.id');
      table.foreign('deckId').references('deck.id');
    });
  }
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('answer');
};
