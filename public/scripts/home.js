$(document).ready(function() {

  $(window).scroll((e) => {
    let $elem = $('.playTitle');
    let isPositionFixed = ($elem.css('position') == 'fixed');
    if ($(this).scrollTop() > 200 && !isPositionFixed) {
      $('.playTitle').addClass('playTitileAffix');
    }
    if ($(this).scrollTop() < 200 && isPositionFixed) {
      $('.playTitle').removeClass('playTitileAffix')
    }
  })

})
