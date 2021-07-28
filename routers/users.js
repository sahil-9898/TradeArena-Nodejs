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
  userController.createSession
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  userController.createSession
);

router.get("/logout", userController.logout);

module.exports = router;
