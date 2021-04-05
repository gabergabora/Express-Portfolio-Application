const express = require('express');
const router=express.Router();
const mongo = require('mongodb');
const db = require('monk')('localhost/portfolio');

router.get('/', function(req, res, next) {
	const db = req.db;
	const courses = db.get('courses');
	courses.find({},{},(err, courses)=>{
		res.render('admin/index', { courses:courses });
	});
});

module.exports=router;