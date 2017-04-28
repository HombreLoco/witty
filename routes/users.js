"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
      res.status(400).json({ error: 'invalid request: no data in form'});
      return;
    }
    knex('users')
      .insert({firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               password: req.body.password,
               createDate: new Date(),
               cookie: "cookie"
      })
      .then(() => {
        res.redirect("/");
    });
  });

  router.post("/login", (req, res) => {
      if (!req.body.email || !req.body.password) {
        res.status(400).json({ error: 'invalid request: no data in form'});
        return;
      }
      knex('users').where({
        email: req.body.email,
        password:  req.body.password
        }).select('firstname')
      .then((results) => {
          res.json(results);
    })
  });


  return router;
}
