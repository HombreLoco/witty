"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/play", (req, res) => {
    knex('userdeckscore')
      .insert({userid: req.body.userid,
               deckid:  req.body.deckid,
               correctanswercount: req.body.correctanswercount
      })
      .then(() => {
        res.redirect("/");
    });
  });

  router.get("/play", (req, res) => {
    knex
      .select("*")
      .from("userdeckscore")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
