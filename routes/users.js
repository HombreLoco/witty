"use strict";

const express         = require('express');
const router          = express.Router();
const cookieSession   = require('cookie-session');
const bcrypt          = require('bcrypt');
const app             = express();

app.use(cookieSession( {
  name: "session",
  keys: ["key1", "key2"]
}));

module.exports = (knex) => {

  // this checks if user is already logged in
  router.get("/", (req, res) => {
    if(req.session.userId) {
      knex
      .select("users.firstname", "users.id")
      .from("users")
      .where("users.id", req.session.userId)
      .then((results) => {
        if(results) {
          let userData = {
            userId: results[0].id,
            firstname: results[0].firstname
          };
          console.log("userdata:", userData);
          res.json(userData);
        }
      });
    } else {
      res.send(JSON.stringify("no user"));
    }
  });

  router.post("/register", (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.password) {
      res.status(400).json({ error: 'Missing data in form'});
      return;
    }
    knex('users')
    .returning('id')
    .insert({  firstname: req.body.firstname,
               lastname: req.body.lastname,
               email: req.body.email,
               password: bcrypt.hashSync(req.body.password, 10),
               createDate: new Date(),
               cookie: "cookie"
             })
    .then((userId) => {
      req.session.userId = userId;
      req.session.firstname = req.body.firstname;
      let userVars = { userId: userId, firstname: req.body.firstname };
      res.json(userVars);
    });
  });

  router.post("/login", (req, res) => {
    console.log(req.body);
    if (req.body.loginEmail === "" || req.body.loginPassword === "") {
      res.status(400).json({ error: 'invalid request: no data in form'});
      return;
    }
    knex('users').where({
      email: req.body.loginEmail,
    }).select('id', 'firstname', 'password')
    .then((results) => {
      if(results.length === 0){
        res.json({error: "Login attempt failed"});
      } else {
        if(bcrypt.compareSync(req.body.loginPassword, results[0].password)) {
          req.session.userId = results[0].id;
          req.session.firstname = req.body.firstname;
          let userVars = { userId: results[0].id, firstname: results[0].firstname };
          res.json(userVars);
        } else {
          res.json({error: "Login attempt failed"});
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
