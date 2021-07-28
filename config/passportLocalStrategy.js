const passport = require("passport");
const localStrategy = require("passport-local");
const argon2 = require("argon2");

const User = require("../models/User");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        try {
          if (await argon2.verify(user.password, password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          console.log("error while verifying hash password");
          return done(null, false);
        }
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

passport.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/signIn");
  }
};
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
