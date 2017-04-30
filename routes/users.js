"use strict";

const express         = require('express');
const router          = express.Router();
// const bcrypt          = require('bcrypt');

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
      res.status(400).json({ error: 'invalid request: no data in form'});
      return;
    }
    knex('users')
    .insert({  firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               password: bcrypt.hashSync(req.body.password, 10),
               createDate: new Date(),
               cookie: "cookie"
             })
    .then(() => {
      res.redirect("/");
    });
  });

  router.post("/login", (req, res) => {
      if (!req.body.loginemail || !req.body.loginpassword) {
        res.status(400).json({ error: 'invalid request: no data in form'});
        return;
      }
      knex('users').where({
        email: req.body.loginemail,
      }).select('firstname', 'password')
      .then((results) => {
        //print hello (name). on test page results[0].firstname
        if(results.length === 0){
          res.redirect("/");
        } else {
          if(bcrypt.compareSync(req.body.loginpassword, results[0].password)) {
            res.redirect("/");
          } else {
            res.status(400).json({ error: 'invalid details'}); //print error message on registration page
          }
        }
      })
    });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/")
  });
  return router;
}
