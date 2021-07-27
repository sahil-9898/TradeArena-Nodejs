const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index.ejs");
  } else {
    res.render("register.ejs");
  }
});
router.post("/register", (req, res) => {
  if (req.body.password != req.body.confirmPassword) {
    console.log("Password not matching");
    return;
  }
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("error in finding user");
      return;
    }
    if (user) {
      console.log("user already exists");
      return;
    }
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      (err, user) => {
        if (err) {
          console.log("cannot create user");
        } else {
          console.log("user created");
          return res.redirect("/users/login");
        }
      }
    );
  });
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
