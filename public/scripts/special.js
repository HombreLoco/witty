$( document ).ready(function() {
  $("#submitRegistrationInfo").on("click", function(event) {
    event.preventDefault();
    if ($("#firstname").val() === "" || $("#lastname").val() === "" || $("#email").val() === "" || $("#password").val() === "") {
      $("#error").text("Please make sure you entered all details correctly!").fadeIn().delay(5000).fadeOut();
      return;
    }
  });

  $("#submitLoginInfo").on("click", function(event) {
    event.preventDefault();
    if ($("#loginemail").val() === "" || $("#loginpassword").val() === "") {
      $("#error").text("Please make sure you entered all details correctly!").fadeIn().delay(5000).fadeOut();
      return;
    }
  });
});
