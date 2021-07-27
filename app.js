const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
const passport = require("passport");
const userDb = require("./config/mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// const sessionInit = (client) => {
//   app.use(
//     session({
//       name: "tradeArena",
//       store: MongoStore.create({ client: client }),
//       saveUninitialized: false,
//       cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
//         httpOnly: true,
//         sameSite: "lax",
//       },
//       secret: process.env.SESSION_SECRET,
//       resave: false,
//     })
//   );
// };
// (async function () {
//   const connection = await userDb;
//   const mongoClient = connection.getClient();
//   sessionInit(mongoClient);
// })();

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

app.listen(process.env.PORT || 3000, () => {
  console.log("Started on localhost 3000");
});
