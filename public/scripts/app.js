$( document ).ready(function() {
    console.log( "ready!" );

  //toggle nav elements display after login
  function renderElementsOnLogin() {
    $("#createNav").css("display", "inline");
    $("#logoutNav").css("display", "inline");
    $("#loginNav").css("display", "none");
    $("#registerNav").css("display", "none");
  }

  //toggle nav elements display after logout
  function renderElementsOnLogout() {
    $("#createNav").css("display", "none");
    $("#logoutNav").css("display", "none");
    $("#loginNav").css("display", "inline");
    $("#registerNav").css("display", "inline");
  }

  // check if user is logged in on page load and dynamically renders
  // page elements depending on status
  $(() => {
    $.ajax({
      method: "GET",
      url: `/api/users`
    }).done((user) => {
      if (!user.userId || !user.firstname) {
        renderElementsOnLogout();
      } else {
        renderElementsOnLogin();
      }
    });
  });

  // event for when user submits registration form
  $("#regForm").on("submit", function(event) {
    let formData = $("#regForm").serialize()
    event.preventDefault();
    if ($("#firstname").val() === "" || $("#lastname").val() === "" || $("#email").val() === "" || $("#password").val() === "") {
      $("#regError").text(results.error).css("color", "red").fadeIn().delay(5000).fadeOut();
    } else {
      $.ajax({
        method: "POST",
        url: `/api/users/register`,
          data: formData
      })
      .done((results) => {
        if (results.error) {
          renderElementsOnLogout();
          $("#regError").text(results.error).css("color", "red").fadeIn().delay(5000).fadeOut();
        } else {
          renderElementsOnLogin();
        }
      });
    }
  });

  // event for when user submits login form
  $("#loginForm").on("submit", function(event) {
    let formData = $("#loginForm").serialize();
    event.preventDefault();
    if ($("#loginemail").val() === "" || $("#loginpassword").val() === "") {
      $("#loginError").text("Fields cannot be empty").css("color", "red").fadeIn().delay(5000).fadeOut();
    } else {
      $.ajax({
        method: "POST",
        url: `/api/users/login`,
        data: formData
      })
      .done((results) => {
        if (results.error) {
          renderElementsOnLogout();
          $("#loginError").text(results.error).css("color", "red").fadeIn().delay(5000).fadeOut();
        } else {
          renderElementsOnLogin();
        }
      });
    }
  });

  //event to toggle login form within navbar
  $("#loginNav a").on("click", function(event) {
    event.preventDefault();
    var formView = $("#loginForm");
    if ($("#regForm").is(":visible")) {
      $("#regForm").hide();
    }
    if (formView.is(":visible")) {
      formView.slideUp( "slow" );
    } else {
      formView.slideDown( "slow" );
    }
  })

  //event to toggle registration form within navbar
  $("#registerNav a").on("click", function(event) {
    event.preventDefault();
    var formView = $("#regForm");
    if ($("#loginForm").is(":visible")) {
      $("#loginForm").hide();
    }
    if (formView.is(":visible")) {
      formView.slideUp( "slow" );
    } else {
      formView.slideDown( "slow" );
    }
  })

  $("#logoutNav").on("click", function(event) {
    $.ajax({
        method: "POST",
        url: `/api/users/logout`,
        success: function() {
          FB.logout(function(response) {
            // Person is now logged out
          });
          location.reload();
        }
      })
  })


  // create HTML markup for individual slide data
  function createSlide(slides) {
    return    `<div class="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="playSlide">
              <h4>${slides.question}</h4>
              <div class="col-xs-12 col-md-6 col-sm-10 col-lg-5 text-primary">
                <img src="${slides.pictureUrl}" alt="">
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5 data-answer="${slides.answers[0].correct}"> ${slides.answers[0].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg">Select</button>
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5 data-answer="${slides.answers[1].correct}"> ${slides.answers[1].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg">Select</button>
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5 data-answer="${slides.answers[2].correct}"> ${slides.answers[2].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg">Select</button>
              </div>
              <div class="col-xs-12 col-md-9 col-sm-9 col-lg-9 text-primary">
                <h5 data-answer="${slides.answers[3].correct}"> ${slides.answers[3].answer} </h5>
              </div>
              <div class="col-xs-12 col-md-3 col-sm-3 col-lg-3 text-primary">
                <button class="btn btn-success btn-lg">Select</button>
              </div>
            </div>`;
  }

  // loop through individual slides and pass to HTML rendering function
  function renderSlides(deck) {
    let deckName = `<header>
                    <h1 class="col-xs-12 col-md-12 col-lg-12 text-primary bg-primary playTitle">${deck.name}</h1>
                    </header>`;
    $("#theDeck").append(deckName);
    deck.slides.forEach(function(value, index) {
      let newSlide = createSlide(value);
      $("#theDeck").append(newSlide);
    })
  }

  // get all decks from the database
  $(() => {
    $.ajax({
      method: "GET",
      url: `/api/decks`
    }).done((decks) => {
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
    }).done((deck) => {
      renderSlides(deck);
    });
  });


  // save a deck to the database
  // need to create an object that matches the format below
  // the object will be passed to the route and parsed before saving in database
  // $(() => {
  //   let newDeck = {};
  //   newDeck.name = "Basketball Stars";
  //   newDeck.userId = 1;
  //   newDeck.slides = [];
  //   newDeck.slides[0] = {};
  //   newDeck.slides[0].question = "How many triple doubles did Russell Westbrook have in the 2016/2017 season?";
  //   newDeck.slides[0].pictureUrl = "../userUpload/basketball.png";
  //   newDeck.slides[0].answers = [];
  //   newDeck.slides[0].answers[0] = {};
  //   newDeck.slides[0].answers[1] = {};
  //   newDeck.slides[0].answers[2] = {};
  //   newDeck.slides[0].answers[3] = {};
  //   newDeck.slides[0].answers[0].answer = "42";
  //   newDeck.slides[0].answers[0].correct = "true";
  //   newDeck.slides[0].answers[1].answer = "22";
  //   newDeck.slides[0].answers[1].correct = "false";
  //   newDeck.slides[0].answers[2].answer = "13";
  //   newDeck.slides[0].answers[2].correct = "false";
  //   newDeck.slides[0].answers[3].answer = "46";
  //   newDeck.slides[0].answers[3].correct = "false";
  //   newDeck.slides[1] = {};
  //   newDeck.slides[1].question = "Who has the most famous receding hairline in basketball?";
  //   newDeck.slides[1].pictureUrl = "../userUpload/basketball.png";
  //   newDeck.slides[1].answers = [];
  //   newDeck.slides[1].answers[0] = {};
  //   newDeck.slides[1].answers[1] = {};
  //   newDeck.slides[1].answers[2] = {};
  //   newDeck.slides[1].answers[3] = {};
  //   newDeck.slides[1].answers[0].answer = "Shaq";
  //   newDeck.slides[1].answers[0].correct = "false";
  //   newDeck.slides[1].answers[1].answer = "James Harden";
  //   newDeck.slides[1].answers[1].correct = "false";
  //   newDeck.slides[1].answers[2].answer = "Lebron James";
  //   newDeck.slides[1].answers[2].correct = "true";
  //   newDeck.slides[1].answers[3].answer = "Michael Jordan";
  //   newDeck.slides[1].answers[3].correct = "false";
  //   $.ajax({
  //     method: "POST",
  //     url: `/api/decks`,
  //     data: newDeck,
  //     datatype: 'json'
  //   })
  // })


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
    });
  });

});
