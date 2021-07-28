const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.checkAuthenticated, (req, res) => {
  res.render("index.ejs");
});
router.use("/", require("./users"));

module.exports = router;
