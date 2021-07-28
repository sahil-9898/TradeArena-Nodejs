const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile._json.email }, (err, user) => {
        if (err) {
          console.log("Error in google auth config");
          return;
        }
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              name: profile._json.name,
              email: profile._json.email,
              password: "tempPassword",
            },
            (err, user) => {
              if (err) {
                console.log("error in creating user in google auth");
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);
