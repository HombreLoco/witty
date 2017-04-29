$(document).ready(function() {

  const $playTitle = $('.playTitle')
  const $navbar = $('.navbar')

  $(window).scroll((e) => {
    let isPositionFixed = ($playTitle.css('position') == 'fixed')
    let viewport = $(window).width()
    let spyPoint = 340

    if (viewport > 764 && viewport < 985) {
      spyPoint = 400
    } else if (viewport > 985 && viewport < 1195) {
      console.log(`Hello World!`)
      spyPoint = 600
    } else if (viewport > 1195) {
      spyPoint = 620
    }
    if ($(this).scrollTop() > spyPoint && !isPositionFixed) {
      $playTitle.addClass('playTitileAffix')
      $navbar.addClass('navbarAffix')

    }
    if ($(this).scrollTop() < spyPoint && isPositionFixed) {
      $playTitle.removeClass('playTitileAffix')
      $navbar.removeClass('navbarAffix')
    }
  })
})
