"use strict";

const express = require('express');
const router  = express.Router();
const randomize = require('randomatic');

module.exports = (knex) => {

  // this grabs three random decks (their name and id) to be displayed
  // on the frontend for users to select from
  router.get("/", (req, res) => {
    knex.select("deck.name", "deck.id", "deck.pictureUrl").from("deck").orderByRaw("RANDOM()").limit(3)
    .then((results) => {
      console.log("results", results);
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
      fullDeck.name = deck[0].name;
      fullDeck.id = deck[0].id;
      return knex.select("slides.slideAnswerId", "slides.question", "slides.pictureUrl")
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
      return knex.select("answer.id", "answer.answer", "answer.correctAnswer", "answer.slideAnswerId", "answer.deckId")
        .from("answer")
        .where("answer.deckId", fullDeck.id)
    })
    .then(function(answers) {
      fullDeck.slides.forEach(function(slideValue, slideIndex) {
        fullDeck.slides[slideIndex].answers = [];
        answers.forEach(function(answerValue, answerIndex) {
          if (slideValue.slideAnswerId === answerValue.slideAnswerId) {
            fullDeck.slides[slideIndex].answers.push(answerValue);
          }
        })
      })
      res.json(fullDeck);
    })
  });


  // save a new deck to the database
  router.post("/", (req, res) => {
    let deckObj = req.body;
    let deckPicUrl = deckObj.slides[0].pictureUrl;
    deckObj.slides.forEach(function(value, index) {
      value.slideAnswerId = randomize('Aa0!', 15);
      value.answers.forEach(function(aValue, aIndex) {
        aValue.slideAnswerId = value.slideAnswerId;
      })
    })
    knex("deck")
    .returning(["id", "createDate"])
    .insert({name: deckObj.name, userId: deckObj.userId, createDate: new Date(), pictureUrl: deckPicUrl})
    .then(function(theDeckId) {
      let deckSlides = [];
      deckObj.slides.forEach(function(value, index) {
        value.deckId = theDeckId[0].id;
        value.createDate = theDeckId[0].createDate;
        deckSlides.push({question: value.question, deckId: value.deckId, createDate: value.createDate, pictureUrl: value.pictureUrl, slideAnswerId: value.slideAnswerId});
      })
      knex.batchInsert("slides", deckSlides)
      .then(function(ids) { })
      .catch(function(error) { });
      return theDeckId;
    })
    .then(function(theDeckId) {
      let slideAnswers = [];
      deckObj.slides.forEach(function(sValue, sIndex) {
        deckObj.slides[sIndex].answers.forEach(function(answerValue, answerIndex) {
          slideAnswers.push({deckId: theDeckId[0].id, slideAnswerId: answerValue.slideAnswerId, answer: answerValue.answer, correctAnswer: answerValue.correct})
        })
      })
      knex.batchInsert("answer", slideAnswers)
      .then(function(ids) { })
      .catch(function(error) { });
      res.status(201).send();
    })
  });


  return router;
}

