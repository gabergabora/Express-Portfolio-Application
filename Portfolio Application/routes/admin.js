const express = require("express");
const Courses = require("../models/courses");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/add", (req, res, next) => {
  Courses.find()
    .then((courses) => {
      res.render("admin/add", { courses: courses });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.post(
  "/add",
  body("title", "Title field is required").notEmpty(),
  body("description", "Description field is required").notEmpty(),
  body("service", "Service field is required").notEmpty(),
  body("client", "Client field is required").notEmpty(),
  body("projectUrl", "projectUrl field is required").notEmpty(),
  body("mainimage", "Main Image field is required").notEmpty(),
  (req, res, next) => {
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
      mainimage:req.body.mainimage
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

router.get("/show/:id", (req, res, next) => {
  Courses.findOne({ _id: req.params.id })
    .then((course) => {
      res.render("admin/details", { course: course });
    })
    .catch((error) => {
      res.json(error);
      console.log(error);
    });
});

router.get("/edit/:id", (req, res, next) => {
  Courses.findOne({ _id: req.params.id })
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

router.post("/edit/:id", (req, res, next) => {
  Courses.findByIdAndUpdate(req.params.id, {
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

router.delete("/delete/:id", (req, res, next) => {
  Courses.findByIdAndDelete({ _id: req.params.id })
    .then((job) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.json(error);
    });
});


router.post('/addcomment', function(req, res, next) {
  // Get Form Values
  const name = req.body.name;
  const email= req.body.email;
  const body = req.body.body;
  const postid= req.body.postid;
  const commentdate = new Date();

	if(errors){
		const posts = db.get('posts');
		posts.findById(postid, function(err, post){
			res.render('show',{
				"errors": errors,
				"post": post
			});
		});
	} else {
		const comment = {
			"name": name,
			"email": email,
			"body": body,
			"commentdate": commentdate
		}

		const posts = db.get('posts');

		posts.update({
			"_id": postid
		},{
			$push:{
				"comments": comment
			}
		}, function(err, doc){
			if(err){
				throw err;
			} else {
				req.flash('success', 'Comment Added');
				res.location('/posts/show/'+postid);
				res.redirect('/posts/show/'+postid);
			}
		});
	}
});




module.exports = router;
