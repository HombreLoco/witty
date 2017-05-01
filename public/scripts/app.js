
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
