const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: req.user });
});

//sign up
router.get("/sign-up", (req, res, next) => {
  res.render("sign-up-form");
});

router.post("/sign-up", (req, res, next) => {
  try {
    const user = new User({
      name: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10, (err, hash) => {
        if (err) return next(err);
      }),
    });

    const result = user.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

//log in
router.get("/log-in", passport.authenticate("local"), {
  successRedirect: "/",
  failureRedirect: "/",
});

//log out
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
