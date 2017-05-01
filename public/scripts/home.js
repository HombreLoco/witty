$(document).ready(function() {

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

  const highScore = [
    `      <div class="playSlide answerEffect" id="scoreHight1">
        <img src="scoreHigh/yoda.gif" class="img-responsive center-block" alt="winner1">
        <p>Power you have become, the dark side I sense in you.</p>
      </div>`,

    `      <div class="playSlide answerEffect" id="scoreHight2">
        <img src="scoreHigh/firework.gif" class="img-responsive center-block" alt="winner1">
        <p>Excellent. Congratulations!!</p>
      </div>`
  ]

  const lowScore = [
    `      <div class="playSlide answerEffect" id="lowScore1">
        <img src="loserEffect/giphy.gif" class="img-responsive center-block" alt="winner1">
        <p>Chin up. You just need a bit more practice.</p>

      </div>`,
    `      <div class="playSlide answerEffect" id="lowScore2">
        <img src="loserEffect/rain.gif" class="img-responsive center-block" alt="winner1">
        <p>Get up and try again!</p>
      </div>`
  ]

  const scoreObj = {
    userId: 0,
    deckId: 0,
    correctAnswerCount: 0
  }

  let count1 = -1
  let count2 = -1
  let count3 = -1
  let count4 = -1

  const $scoreButton = $(`.scoreButton`)

  // sticky menu
  const $navbar = $('.navbar')
  const $win = $(window)
  const $category = $('.category')
  const stickyMenu = stickyMenuWith($navbar)
  const $theDeck = $('.theDeck')



  $win.on('scroll', stickyMenu)


  // home page - put all the deck thumbs and text on page
  const $cat1 = $('#cat1')

  findHomePageDecks($cat1)


  // choice a deck to play

  const loadTheDeck = getTheDeckWith($category)
  $category.on('click', loadTheDeck)

  // Play the deck
  const checkAnswer = checkAnswerWith()
  $theDeck.on('click', checkAnswer)

  // Get score
  // const getWorldScore = getWorldScoreWith(scoreObj)
  // $('#scoreButton').on('click', () => {
  //   console.log(`Hello World!`)
  //   $theDeck.hide()
  //   $category.show()
  //   scoreObj.playCount
  //   scoreObj.worldScoreAverage
  //   scoreObj.userScore
  //   let message = `Most people got ${scoreObj.worldScoreAverage} right answers. \n You got ${scoreObj.userScore} right answers.`
  // })


  // ********local functions*******


  function getTheDeckWith($category) {
    return function(e) {
      if (!e.target.id) {
        return
      }
      findThatOneDeck(e.target.id)
    }
  }


  function makeDeckThumbs($cat1, decks) {

    let result = ''

    for (each of decks) {
      result =
        `    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6 deckAndtitle">
      <img class="deck_thumb img-responsive center-block" id="${each.id}" src="${each.pictureUrl}" alt="">
      <h4 class="deckTitle">${each.name}</h4>
    </div>
      ` + result

    }

    $cat1.append(result)


  }

  function stickyMenuWith($navbar) {

    return function(eve) {
      let isnabarFixed = ($navbar.css('position') == 'fixed')

      let viewport = $(window).width()
      let spyPoint = 340

      if (viewport > 764 && viewport < 985) {
        spyPoint = 400
      } else if (viewport > 985 && viewport < 1195) {
        spyPoint = 600
      } else if (viewport > 1194) {
        spyPoint = 620
      }
      if ($(this).scrollTop() > spyPoint && !isnabarFixed) {
        $navbar.addClass('navbarAffix')
        $('.playTitle').addClass('playTitileAffix')

      }
      if ($(this).scrollTop() < spyPoint && isnabarFixed) {
        $('.playTitle').removeClass('playTitileAffix')
        $navbar.removeClass('navbarAffix')
      }
    }
  }

  // function to get the decks from the db

  function findHomePageDecks($cat1) {
    $.ajax({
      method: "GET",
      url: `/api/decks`
    }).done((decks) => {
      makeDeckThumbs($cat1, decks)
    })
  }

  function getWorldScoreWith(scoreObj) {
    console.log(`Hello World!`)
    return function() {

      $('.theDeck').hide()
      $('.category').show()
      scoreObj.playCount
      scoreObj.worldScoreAverage
      scoreObj.userScore
      let message = `Most people got ${scoreObj.worldScoreAverage} right answers. \n You got ${scoreObj.userScore} right answers.`
        /*  $.ajax({
            method: "POST",
            url: `/api/score`,
            data: scoreObj,
            datatype: 'json'
          }).done((score) => {*/
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
        */
    }

  }

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




  function findThatOneDeck(deckID) {
    $.ajax({
      method: "GET",
      url: `/api/decks/${deckID}`
    }).done((deck) => {
      renderSlides(deck);
    });
  }


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

      if (e.target.id != 'score') {
        if (e.target.dataset.answer === "true") {
          scoreObj.correctAnswerCount += 1
          count1 = (count1 === 2 ? 0 : ++count1)
          $theSlide.html(htmlWinner[count1]).scrollTop(100)

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
        return
      } // end of answer

      if (e.target.id == 'score') {
        scoreObj.playCount
        scoreObj.worldScoreAverage
        scoreObj.userScore
        let percentage = Math.round((scoreObj.correctAnswerCount / 3)) * 100
        let resultHTML = ''
        if (percentage > 0) {
          resultHTML = `<div class="playSlide answerEffect" id="scoreHight1">
        <img src="scoreHigh/yoda.gif" class="img-responsive center-block" alt="winner1">
        <p>You scored ${percentage}%.</p>
        <p>Power you have become, the dark side I sense in you.</p>
      </div>`

        } else if (percentage <= 0) {
          resultHTML =
 `      <div class="playSlide answerEffect" id="lowScore1">
        <img src="scoreLow/giphy.gif" class="img-responsive center-block" alt="winner1">
                <p>You scored ${percentage}%.</p>
        <p>Chin up. You just need a bit more practice.</p>

      </div>`
        }
        console.log(resultHTML)
        console.log(`percentage: ${percentage}`)
        $theDeck.html(resultHTML)
        setTimeout(() => {
          $theDeck.hide()
          $category.show()
        }, 5000);
      } // end of score
    }
  }

})
