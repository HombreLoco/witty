

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


