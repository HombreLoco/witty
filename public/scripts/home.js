$(document).ready(function() {

  const decks = [

    { 'id': 1, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/WorldCup01.jpg" },
    { 'id': 2, 'name': 'Find out more about beer and wine.', 'pictureUrl': "userUpload/worldCup01.jpg" },
    { 'id': 3, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/BeerWine.jpg" },
    { 'id': 4, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/cheese.jpg" },
    { 'id': 5, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/cheese.jpg" },
    { 'id': 6, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/solarPanel.jpg" },
    { 'id': 7, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/solarPanel.jpg" },
    { 'id': 8, 'name': 'World Cup 2018 is coming.', 'pictureUrl': "userUpload/rain_forest.jpg" }

  ]

  const score = []

  // sticky menu
  const $navbar = $('.navbar')
  const $win = $(window)
  const $category = $('.category')
  const stickyMenu = stickyMenuWith($navbar)
  const $theDeck = $('.theDeck')

  $win.on('scroll', stickyMenu)


  // home page - put all the deck thumbs and text on page
  const $cat1 = $('#cat1')
  findHomePageDecks(decks => makeDeckThumbs($cat1, decks))

  // choice a deck to play
  const scoreObj = {
    userId: 0,
    deckId: 0,
    correctAnswerCount: 0
  }

  const loadTheDeck = getTheDeckWith($category)
  $category.on('click', loadTheDeck)

  // Play the deck
  const checkAnswer = checkAnswerWith()
  $theDeck.on('click', checkAnswer)


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




})
