const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash=require('connect-flash');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
const methodOverride=require('method-override');
const app = express();
const passport = require('passport');
const Courses = require('./models/courses')

dotenv.config({path:'./config/config.env'});
connectDatabase()


app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


require('./middleware/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport Config
app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.get("/", function (req, res) {
  Courses.find()
    .then((courses) => {
      res.render("index", { courses: courses });
    })
    .catch((error) => {
      res.json(error);
    });
});


//routes files
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/users');

app.use('/admin',adminRouter);
app.use('/users',userRouter);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})

