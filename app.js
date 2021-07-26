const express = require("express");
const app = express();
const userDb = require("./config/mongoose");

app.listen(process.env.PORT || 3000, () => {
  console.log("Started on localhost 3000");
});
