$( document ).ready(function() {
    console.log( "ready!" );

  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.firstname).appendTo($("body"));
        $("<div>").text(user.lastname).appendTo($("body"));
        $("<br>").appendTo($("body"));
      }
    });;
  });

  // get all decks from the database
  $(() => {
    $.ajax({
      method: "GET",
      url: `/api/decks`
    }).done((decks) => {
      for(deck of decks) {
        console.log(decks);
        $("<div>").text(deck.id).appendTo($("body"));
        $("<div>").text(deck.name).appendTo($("body"));
        $("<div>").text(deck.genre).appendTo($("body"));
        $("<br>").appendTo($("body"));
        console.log("where am i");
      }
    });;
  });

  // get a single deck from the database
  $(() => {
    let deckIDID = 14;
    $.ajax({
      method: "GET",
      url: `/api/decks/${deckIDID}`
    }).done((decks) => {
        console.log(decks);
    });;
  });

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.firstname).appendTo($("body"));
      $("<div>").text(user.lastname).appendTo($("body"));
      $("<br>").appendTo($("body"));
    }
  });;






});
