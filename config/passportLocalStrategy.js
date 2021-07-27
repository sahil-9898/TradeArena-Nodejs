const passport = require("passport");
const localStrategy = require("passport-local");

const User = require("../models/User");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user || user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error finding user -> deserializer");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;
