const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { urlencoded, json } = require("body-parser");
const passport = require("passport");
const userDb = require("./config/mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passportLocal = require("./config/passportLocalStrategy");
const passportGoogle = require("./config/passportGoogleStrategy");

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static("public"));

app.use(
  session({
    name: "tradeArena",
    store: MongoStore.create({ clientPromise: userDb }),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: "lax",
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use("/", require("./routers/index"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Started on localhost 3000");
});
