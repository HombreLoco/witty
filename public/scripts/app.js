// $( document ).ready(function() {
//     console.log( "ready!" );

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

const htmlWinner = [`
      <div class="answerEffect" id="winner1">
                <img src="winnerEffect/1.gif" class="img-responsive center-block" alt="winner1">
                <p>That is correct.</p>
                <p>Good job smartie!</p>
            </div>`,

  `
      <div class="answerEffect" id="winner2">
        <img src="winnerEffect/2.gif" class="img-responsive center-block" alt="winner1">
        <p>That is correct.</p>
        <p>You are awesome!</p>
      </div>`,

  `
      <div class="answerEffect" id="winner3">
        <img src="winnerEffect/3.gif" class="img-responsive center-block" alt="winner1">
        <p>Wow!</p>
        <p>Is Witty your middle name?!!</p>
      </div>`
]

const htmlloser = [`
      <div class="answerEffect" id="loser1">
        <img src="loserEffect/1.gif" class="img-responsive center-block" alt="winner1">
        <p>Hmmm...not quite</p>
        <p>Better luck next time.</p>
      </div>`,

  `
      <div class="playSlide answerEffect" id="loser2">
        <img src="loserEffect/2.gif" class="img-responsive center-block" alt="winner1">
        <p>Nope.</p>
        <p>10 pushups please.</p>
      </div>`,

  `
      <div class="playSlide answerEffect" id="loser3">
        <img src="loserEffect/3.gif" class="img-responsive center-block" alt="winner1">
        <p>Come on, seriously?</p>
        <p>It wasn't that hard!!!</p>
      </div>`
]

const $scoreButton = `<button class="btn btn-info btn-lg scoreButton">Get World Score</button>`

const scoreObj = {
  userId: 0,
  deckId: 0,
  correctAnswerCount: 0
}

let count1 = -1
let count2 = -1

function createSlide(slides) {
  return `<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
            </div>`
}


function renderSlides(deck) {
  $theDeck = $('.theDeck')
  let deckName = `<header>
          <h1 class="col-xs-12 col-md-12 col-lg-12 text-primary bg-primary playTitle">${deck.name}</h1>
        </header>`;
  $theDeck.html(deckName);
  for (var i = 0; i < deck.slides.length; i++) {
    var o = deck.slides[i];
    let newSlide = createSlide(o);
    $theDeck.append(newSlide);
  }
  $theDeck.find(':last').after($scoreButton)
  $theDeck.show()
  $('.category').hide()
}



// function to get the decks from the db

const findHomePageDecks = (cb) => {
  $.ajax({
    method: "GET",
    url: `/api/decks`
  }).done((decks) => {
    console.log(`decks`)
    console.log(decks)
    cb(decks)
  })
}


function findThatOneDeck(deckID) {
  $.ajax({
    method: "GET",
    url: `/api/decks/${deckID}`
  }).done((deck) => {
    renderSlides(deck);
  });
}

/*$(() => {
  $.ajax({
    method: "GET",
    url: `/api/decks`
  }).done((decks) => {
    console.log(decks);
    for (deck of decks) {

    }
  })
});*/


// load a single deck from the database

/*  $(() => {
    let deckIDID = 1;
<<<<<<< HEAD
=======
    // let deckIDID = 43;
>>>>>>> Keawe_Sunday
    $.ajax({
      method: "GET",
      url: `/api/decks/${deckIDID}`
    }).done((deck) => {
      renderSlides(deck);
    });
  });
*/


//Event listener for the buttons on slides
/*$(".theDeck").on("click", function(e) {
  event.stopPropagation();
  if (e.target.id == '') {
    return
  }
  if (e.target.dataset.answer === "true") {
    alert("Corrrect Answer!" + 'clicked id: ' + e.target.id);
  } else {
    alert("Wrong Answer :(");
  }
})
*/
function checkAnswerWith() {

  return function(e) {
    event.stopPropagation()
    if (e.target.id == '') {
      return
    }
    let $selectedID = $(`#${e.target.id}`)
    let $theSlide = $selectedID.closest('.playSlide')
    let $rightButton = $theSlide.find('[data-answer=true]')
    $rightButton.text('Correct answer')
    let theSlideContent = $selectedID.closest('.playSlide').html()
    if (e.target.dataset.answer === "true") {
      scoreObj.correctAnswerCount += 1
      count1 = (count1 === 2 ? 0 : ++count1)
      $theSlide.html(htmlWinner[count1]).scrollTop(200)

    } else {
      count2 = (count2 === 2 ? 0 : ++count2)
      $theSlide.html(htmlloser[count2])
    }
    setTimeout(() => {
      $theSlide.html(theSlideContent)
      let $slideButtons = $theSlide.find('button')
      $slideButtons.attr("disabled", "disabled")
      $slideButtons.addClass('greyOut')
      $('.scoreButton').removeAttr('disabled')
      $('.scoreButton').removeClass('greyOut')
    }, 3000);


  }
}



// save a deck to the database
// need to create an object that matches the format below
// the object will be passed to the route and parsed before saving in database
/*$(() => {
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
*/

// save score data for a single play and return world score information

function getWorldScore(scoreObj) {

  $.ajax({
    method: "POST",
    url: `/api/score`,
    data: scoreObj,
    datatype: 'json'
  }).done((score) => {
    score.playCount
    score.worldScoreAverage
    score.userScore
    let message = `Most people got ${score.worldScoreAverage} right answers. \n You got ${score.userScore} right answers.`
    $('.category').show()


  });
}

/*$(() => {
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




*/


// });
