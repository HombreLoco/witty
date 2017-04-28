"use strict";

const express = require('express');
const router  = express.Router();
let lookUp = 0;

module.exports = (knex) => {

  // make this grab three random decks, returning only the deckId and first
  // picture to display as clickable icon
  router.get("/", (req, res) => {
    knex.select("deck.genreId", "deck.name", "deck.id")
    .from("deck")
    .then((results) => {
      res.json(results);
    })
  });


  // route to get single deck and slides from database
  router.get("/:id", (req, res) => {
    let fullDeck = {};
    knex.select("deck.genreId", "deck.name", "deck.id")
    .from("deck")
    .where("id", parseInt(req.params.id))
    .then(function(deck) {
      fullDeck.genreId = deck[0].genreId;
      fullDeck.name = deck[0].name;
      fullDeck.id = deck[0].id;
      return knex.select("slides.id", "slides.question", "slides.pictureUrl")
      .from("slides")
      .where("slides.deckId", deck[0].id)
    })
    .then(function(slides) {
      fullDeck.slides = [];
      slides.forEach(function(value, index) {
        fullDeck.slides.push(value);
      })
    })
    .then(function(getAnswers) {
      return knex.select("answer.id", "answer.answer", "answer.correctAnswer", "answer.slideId", "answer.deckId")
        .from("answer")
        .where("answer.deckId", fullDeck.id)
    })
    .then(function(answers) {
      fullDeck.slides.forEach(function(slideValue, slideIndex) {
        fullDeck.slides[slideIndex].answers = [];
        answers.forEach(function(answerValue, answerIndex) {
          if (slideValue.id === answerValue.slideId) {
            fullDeck.slides[slideIndex].answers.push(answerValue);
          }
        })
      })
      console.log("fullDeck", fullDeck);
      res.json(fullDeck);
    })
  });
  return router;
}

