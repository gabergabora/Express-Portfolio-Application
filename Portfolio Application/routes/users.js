const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.get("/login", (req, res,next) => {
  res.render("users/login");
});

router.post(
   "/register",
  body("name", "Name field is required").notEmpty(),
  body("email", "Email field is required").isEmail(),
  body("password", "Password field is required").notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      const salt = await bcrypt.genSalt(10);
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        username:req.body.username,
        password: await bcrypt.hash(req.body.password, salt)
      });
      newUser.save(newUser)
        res.redirect('/')
    }
);

router.post('/login',async (req, res,next) => {
  passport.authenticate('local', {
    successRedirect: '/admin/add',
    failureRedirect: '/users/register',
    failureFlash: true
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
