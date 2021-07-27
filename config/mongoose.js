const mongoose = require("mongoose");

const userDb = mongoose
  .connect(process.env.USER_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDb connected");
    return mongoose.connection.getClient();
  });

module.exports = userDb;
