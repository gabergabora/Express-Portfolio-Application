const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/images" });
const db = require("monk")("localhost/portfolio");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/add", (req, res, next) => {
  const db = req.db;
  const courses = db.get("courses");
  courses.find({}, {}, (err, courses) => {
    res.render("admin/add", { courses: courses });
  });
});

router.post("/add", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const service = req.body.service;
  const client = req.body.client;
  const projectUrl = req.body.projectUrl;
  const date = new Date();

  body("title", "Title field is required").notEmpty();
  body("description", "Description field is required").notEmpty();
  body("service", "Service field is required").notEmpty();
  body("client", "Client field is required").notEmpty();
  body("projectUrl", "projectUrl field is required").notEmpty();

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    const courses = db.get("courses");
    courses.insert(
      {
        title: title,
        description: description,
        service: service,
        client: client,
        projectUrl: projectUrl,
        date: date,
      },
      (error, post) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/");
        }
      }
    );
  }
});

router.get("/show/:id", (req, res, next) => {
  const courses = db.get("courses");
  courses.findOne(req.params.id, (error, course) => {
    res.render("admin/details", {
      course: course,
    });
  });
});

router.get("/edit/:id", (req, res, next) => {
  const courses = db.get("courses");
  courses.findOne(req.params.id, (error, course) => {
    res.render("admin/edit", {
      course: course,
    });
  });
});

router.post("/edit/:id", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const service = req.body.service;
  const client = req.body.client;
  const projectUrl = req.body.projectUrl;

  body("title", "Title field is required").notEmpty();
  body("description", "Description field is required").notEmpty();
  body("service", "Service field is required").notEmpty();
  body("client", "Client field is required").notEmpty();
  body("projectUrl", "projectUrl field is required").notEmpty();

  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    const courses = db.get("courses");
    courses.updateOne(
      {
        title: title,
        description: description,
        service: service,
        client: client,
        projectUrl: projectUrl,
      },
      (error, post) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/");
        }
      }
    );
  }
});

router.delete("/delete/:id", (req, res) => {
  const courses = db.get("courses");
  courses.findByIdAndDelete(req.params.id,(error,docs)=>{
    if(error){
      console.log(error)
    }else{
      console.log(docs)
    }
  })
    
});

module.exports = router;
