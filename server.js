"use strict";

require('dotenv').config();
// Lighthouse boiler plates
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const decksRoutes = require("./routes/decks");

// Witty requires
const fs = require('fs.extra')
const fileUpload = require('express-fileupload');
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
app.use("/api/users", usersRoutes(knex));
app.use("/api/decks", decksRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
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

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
