"use strict";

require('dotenv').config();
// Lighthouse boiler plates
const PORT            = process.env.PORT || 8080;
const ENV             = process.env.ENV || "development";
const express         = require("express");
const bodyParser      = require("body-parser");
const sass            = require("node-sass-middleware");
const app             = express();

const knexConfig      = require("./knexfile");
const knex            = require("knex")(knexConfig[ENV]);
const morgan          = require('morgan');
const knexLogger      = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes     = require("./routes/users");
const decksRoutes     = require("./routes/decks");
const scoreRoutes     = require("./routes/score");

//Password hashing require
const bcrypt          = require('bcrypt');

// Witty requires
const fs              = require('fs.extra')
const fileUpload      = require('express-fileupload');

//FB Login requires
const passport        = require("passport")
, FacebookStrategy    = require("passport-facebook").Strategy;

//Cookie Session requires
let cookieSession     = require('cookie-session');

app.use(cookieSession ({
  name: "session",
  keys: ["keys1", "keys2"]
}))

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex, cookieSession));
app.use("/api/decks", decksRoutes(knex));
app.use("/api/score", scoreRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/register", (req, res) => {
//   console.log(`Hello World!`)
//   res.render("register");
// });


app.post("/register", (req, res) => {
  console.log(`Hello World! Put`)
  console.log(req.body.first)
  // res.render("test");
});


// user drag and drop upload
app.post('/user/upload', (req, res) => {
  fs.readFile(req.files.file.name, function(err, data) {
    console.log(req.files)
    let newPath = __dirname + "/public/userUpload/good.jpg";
    fs.writeFile(newPath, data, function(err) {
      res.redirect("back");
    });
  });
});


//facebook login
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Port stuff

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});






