const express = require("express");
const router = express.Router();
const Courses = require("../models/courses");

router.get("/", function (req, res, next) {
  Courses.find()
    .then((courses) => {
      res.render("index", { courses: courses });
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
