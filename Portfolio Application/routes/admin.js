const express = require("express");
const Courses = require("../models/courses");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/add",ensureAuthenticated ,async (req, res, next) => {
  await Courses.find()
    .then((courses) => {
      res.render("admin/add", { courses: courses });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post("/add",
  body("title", "Title field is required").notEmpty(),
  body("description", "Description field is required").notEmpty(),
  body("service", "Service field is required").notEmpty(),
  body("client", "Client field is required").notEmpty(),
  body("projectUrl", "projectUrl field is required").notEmpty(),
  body("mainimage", "Main Image field is required").notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({errors: errors.array()})
    }
     const courses = new Courses({
      title: req.body.title,
      description: req.body.description,
      service: req.body.service,
      client: req.body.client,
      projectUrl: req.body.projectUrl,
      date: req.body.date,
      mainimage:req.body.mainimage,
      author: req.user._id,
    });
    courses
      .save(courses)
      .then((course) => {
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

router.get("/show/:id",async (req, res) => {
 await Courses.findOne({ _id: req.params.id })
    .then((course) => {
      res.render("admin/details", { course: course });
    })
    .catch((error) => {
     res.json(error);
    });
});

router.get("/edit/:id", async (req, res,next) => {
 await Courses.findOne({ _id: req.params.id })
    .then((course) => {
      res.render("admin/edit", {
        course: course,
      });
    })
    .catch((error) => {
      res.json(error);
      res.redirect("/");
    });
});

router.post("/edit/:id", async (req, res,next) => {
 await Courses.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      service: req.body.service,
      client: req.body.client,
      projectUrl: req.body.projectUrl,
    },
  })
    .then((course) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/delete/:id", async (req, res,next) => {
 await  Courses.findByIdAndDelete({ _id: req.params.id })
    .then((job) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.json(error);
    });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;
