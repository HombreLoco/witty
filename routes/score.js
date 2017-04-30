"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  // save scores for a game play
  router.post("/", (req, res) => {
    let scoreObj = req.body;
    let playData = {};
    console.log("scoreBody: ", scoreObj);
    knex('userdeckscore')
    .insert({userId: scoreObj.userId,
             deckId:  scoreObj.deckId,
             correctAnswerCount: scoreObj.correctAnswerCount,
             playDate: new Date()
    })
    .then(() => {
      return knex("userdeckscore")
      .count("deckId")
      .where("deckId", scoreObj.deckId)
    })
    .then((result) => {
      console.log("count of deck plays: ", result);
      playData.playCount = result[0].count;
      return knex("userdeckscore")
      .avg("correctAnswerCount")
      .where("deckId", scoreObj.deckId)
    })
    .then((avg) => {
      console.log("avg: ", Math.round(avg[0].avg));
      playData.worldScoreAverage = Math.round(avg[0].avg);
      playData.userScore = scoreObj.correctAnswerCount;
      console.log("playData", playData);

      res.json(playData);
    });
  });


  return router;
}



