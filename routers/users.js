const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const userController = require("../controllers/user_controller");
const router = express.Router();

router.get("/signUp", userController.signUp);

router.post("/signUp", userController.createUser);

router.get("/signIn", userController.signIn);

router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", userController.logout);

module.exports = router;
