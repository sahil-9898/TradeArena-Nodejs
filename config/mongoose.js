const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(
  process.env.USER_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongoDB connected");
  }
);
const userDb = mongoose.connection;
module.exports = userDb;
