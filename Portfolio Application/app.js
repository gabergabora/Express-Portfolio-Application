const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash=require('connect-flash');
const dotenv=require('dotenv');
const connectDatabase=require('./config/database');
const methodOverride=require('method-override');
const app = express();

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

// Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
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

