$( document ).ready(function() {
    console.log( "ready!" );

  // get all users from
  // $(() => {
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/users"
  //   }).done((users) => {
  //     for(user of users) {
  //       $("<div>").text(user.firstname).appendTo($("body"));
  //       $("<div>").text(user.lastname).appendTo($("body"));
  //       $("<br>").appendTo($("body"));
  //     }
  //   });
  // });


  // get all decks from the database
  $(() => {
    $.ajax({
      method: "GET",
      url: `/api/decks`
    }).done((decks) => {
      console.log(decks);
      for(deck of decks) {
        $("<div>").text(deck.name).appendTo($("body"));
        $("<br>").appendTo($("body"));
      }
    })
  });


  // get a single deck from the database
  $(() => {
    let deckIDID = 1;
    $.ajax({
      method: "GET",
      url: `/api/decks/${deckIDID}`
    }).done((decks) => {
        console.log(decks);
    });
  });


  // save a deck to the database
  // need to create an object that matches the format below
  // the object will be passed to the route and parsed before saving in database
  $(() => {
    let newDeck = {};
    newDeck.name = "Basketball Stars";
    newDeck.userId = 1;
    newDeck.slides = [];
    newDeck.slides[0] = {};
    newDeck.slides[0].question = "How many triple doubles did Russell Westbrook have in the 2016/2017 season?";
    newDeck.slides[0].pictureUrl = "../userUpload/basketball.png";
    newDeck.slides[0].answers = [];
    newDeck.slides[0].answers[0] = {};
    newDeck.slides[0].answers[1] = {};
    newDeck.slides[0].answers[2] = {};
    newDeck.slides[0].answers[3] = {};
    newDeck.slides[0].answers[0].answer = "42";
    newDeck.slides[0].answers[0].correct = "true";
    newDeck.slides[0].answers[1].answer = "22";
    newDeck.slides[0].answers[1].correct = "false";
    newDeck.slides[0].answers[2].answer = "13";
    newDeck.slides[0].answers[2].correct = "false";
    newDeck.slides[0].answers[3].answer = "46";
    newDeck.slides[0].answers[3].correct = "false";
    newDeck.slides[1] = {};
    newDeck.slides[1].question = "Who has the most famous receding hairline in basketball?";
    newDeck.slides[1].pictureUrl = "../userUpload/basketball.png";
    newDeck.slides[1].answers = [];
    newDeck.slides[1].answers[0] = {};
    newDeck.slides[1].answers[1] = {};
    newDeck.slides[1].answers[2] = {};
    newDeck.slides[1].answers[3] = {};
    newDeck.slides[1].answers[0].answer = "Shaq";
    newDeck.slides[1].answers[0].correct = "false";
    newDeck.slides[1].answers[1].answer = "James Harden";
    newDeck.slides[1].answers[1].correct = "false";
    newDeck.slides[1].answers[2].answer = "Lebron James";
    newDeck.slides[1].answers[2].correct = "true";
    newDeck.slides[1].answers[3].answer = "Michael Jordan";
    newDeck.slides[1].answers[3].correct = "false";
    $.ajax({
      method: "POST",
      url: `/api/decks`,
      data: newDeck,
      datatype: 'json'
    })
  })


  // save score data for a single play and return world score information
  $(() => {
    let scoreObj = {};
    scoreObj.userId = 1;
    scoreObj.deckId = 1;
    scoreObj.correctAnswerCount = 3;

    $.ajax({
      method: "POST",
      url: `/api/score`,
      data: scoreObj,
      datatype: 'json'
    }).done((score) => {
        console.log("score: ", score);
    });
  });







});
