exports.up = function(knex, Promise) {
return CreateUserTable();
  .then(CreateDeckTable)
  .then(CreateGenreTable)
  .then(CreateSlidesTable)
  .then(CreateAnswerTable)
  .then(CreateDeckSlidesTable)
  .then(CreateUserDeckScoreTable)


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

  // add foreign keys user and genre
  function CreateDeckTable() {
    return knex.schema.createTable('deck', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.integer('userid(creator)').notNullable();
      table.dateTime('createDate').notNullable();
      table.dateTime('updateDate');
      table.integer('genreid');
    });
  }

  function CreateGenreTable() {
    return knex.schema.createTable('genre', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.text('description').notNullable();
    });
  }

  // add foreign keys genre
  function CreateSlidesTable() {
    return knex.schema.createTable('slides', function (table) {
      table.increments('id');
      table.string('question').notNullable();
      table.integer('genreid').notNullable();
      table.dateTime('createDate');
      table.dateTime('updateDate');
      table.string('pictureUrl');
      table.string('correctAnswer').notNullable();
    });
  }

  function CreateAnswerTable() {
    return knex.schema.createTable('answer', function (table) {
      table.increments('slideId');
      table.string('answer').notNullable();
      table.boolean('correctAnswer').notNullable();
      table.integer('effect');
    });
  }


  // needs to implement foreign keys for deck and slide
  function CreateDeckSlidesTable() {
    return knex.schema.createTable('deckSlides', function (table) {
      table.integer('deckid');
      table.integer('slideid');
    });
  }

  // needs to implement foreign keys for deck and user
  function CreateUserDeckScoreTable() {
    return knex.schema.createTable('userDeckScore', function (table) {
      table.integer('deckid');
      table.integer('userid');
      table.integer('correctAnswerCount');
    });
  }


};


// function (knex, Promise) {
//   return knex.schema.createTable('users', function (table) {
//     table.increments();
//     table.string('name');
//   });
// };

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
