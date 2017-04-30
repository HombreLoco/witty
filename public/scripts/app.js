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

  function createSlide(slides) {
    console.log("what");
    console.log(slides);
    return    `<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="playSlide">
              <h4>${slides.question}</h4>
              <div class="col-xs-12 col-md-6 col-sm-10 col-lg-5 text-primary">
                <img src="${slides.pictureUrl}" alt="">
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5> ${slides.answers[0].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg" id="${slides.answers[0].id}" data-answer="${slides.answers[0].correctAnswer}">Select</button>
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5> ${slides.answers[1].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg" id="${slides.answers[1].id}" data-answer="${slides.answers[1].correctAnswer}">Select</button>
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5> ${slides.answers[2].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg" id="${slides.answers[2].id}" data-answer="${slides.answers[2].correctAnswer}">Select</button>
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5> ${slides.answers[3].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg" id="${slides.answers[3].id}" data-answer="${slides.answers[3].correctAnswer}">Select</button>
              </div>
            </div>`;
  }


  function renderSlides(deck) {
    let deckName = `<header>
          <h1 class="col-xs-12 col-md-12 col-lg-12 text-primary bg-primary playTitle">${deck.name}</h1>
        </header>`;
        $("#theDeck").append(deckName);
    for (var i = 0; i < deck.slides.length; i++) {
      var o = deck.slides[i];
      console.log("ooooooo", o.answers);
      let newSlide = createSlide(o);
      $("#theDeck").append(newSlide);
    }
  }

  // get all decks from the database
  $(() => {
    $.ajax({
      method: "GET",
      url: `/api/decks`
    }).done((decks) => {
      console.log(decks);
      for(deck of decks) {

      }
    })
  });


  // get a single deck from the database
  $(() => {
    let deckIDID = 1;
    let deckIDID = 43;
    $.ajax({
      method: "GET",
      url: `/api/decks/${deckIDID}`
    }).done((deck) => {
      renderSlides(deck);
    });
  });

  //Event listener for the buttons on slides
  $(".theDeck").on("click", function(e) {
    event.stopPropagation();
    console.log("1");
    if (e.target.id =='') {
      return
    }
    console.log(typeof e.target.dataset.answer);
    console.log("2");
    console.log(e.target.dataset.answer);
    // event.stopPropagation();

    if(e.target.dataset.answer === "true") {
      alert("Corrrect Answer!" + 'clicked id: ' + e.target.id);
    } else {
      alert("Wrong Answer :(");
    }
    // alert("the target" + e.target.id);
  })


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
