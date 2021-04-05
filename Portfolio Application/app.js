const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv =require ('dotenv');
const mongo = require('mongodb');
const db = require('monk')('localhost/portfolio');
const multer= require('multer');
const upload = multer({ dest: 'uploads/' })

const app = express();


dotenv.config({path:'./config/config.env'})


app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

//routes files
const indexRouter=require('./routes/index');
const adminRouter=require('./routes/admin')
app.use(indexRouter);
app.use('/admin',adminRouter);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})

module.exports = app;