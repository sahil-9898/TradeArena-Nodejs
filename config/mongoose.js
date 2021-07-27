const mongoose = require("mongoose");
require("dotenv/config");

const userDb = mongoose
  .connect(process.env.USER_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDb connected");
    return mongoose.connection.getClient();
  });
// .then((connection) => {
//   console.log("mongoDb connected");
//   return connection.connection.getClient();
// });

module.exports = userDb;
