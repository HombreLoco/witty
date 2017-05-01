function ShowFbLogin(ShowLogin)
  {
    var div_FBLogin = document.getElementById('facebookMedButton');
    var spn_FBLogin = document.getElementById('fb-login');
    // var div_FBShare = document.getElementById('fbshare');

    if (ShowLogin) {
      div_FBLogin.style.display = 'none';
      // div_FBShare.style.visibility = 'hidden';
    } else {
      div_FBLogin.style.display = 'block';
      // spn_FBLogin.style.display = 'block';
      // div_FBShare.style.visibility = 'visible';
    }
  }



function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
    ShowFbLogin(false);
  } else {
    // The person is not logged into your app or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}


window.fbAsyncInit = function() {
  FB.init({
  appId      : '{your-app-id}',
  cookie     : true,
  xfbml      : true,
  version    : 'v2.8'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=422181911483394";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    // document.getElementById('status').innerHTML =
    //   'Thanks for logging in, ' + response.name + '!';
  });
}
