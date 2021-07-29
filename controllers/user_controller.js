const express = require("express");
const passport = require("passport");
const argon2 = require("argon2");
const User = require("../models/User");

module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.ejs");
  } else {
    res.render("signUp.ejs");
  }
};

module.exports.signIn = (req, res) => {
  if (!req.isAuthenticated()) {
    res.render("signIn.ejs");
  } else {
    res.render("index.ejs");
  }
};

module.exports.createUser = (req, res) => {
  if (req.body.password != req.body.confirmPassword) {
    console.log("Password not matching");
    return;
  }
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log("error in finding user");
      return;
    } else if (user) {
      console.log("user already exists");
      return;
    }
    try {
      hash = await argon2.hash(req.body.password);
    } catch (err) {
      console.log("error while hashing password");
      return;
    }
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      },
      (err, user) => {
        if (err) {
          console.log(err);
          console.log("cannot create user");
        } else {
          console.log("user created");
          return res.redirect("/signIn");
        }
      }
    );
  });
};

module.exports.createSession = (req, res) => {
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.session.destroy();
  res.clearCookie("tradeArena");
  res.redirect("/signIn");
};
