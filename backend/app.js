var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { METHODS } = require('http');
var app = express();
var models = require('./lib/models');
var users = models.Users;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin : [ 'http://localhost:3000' , 'http://localhost:3000/', 'http://127.0.0.1:3000', 'http://127.0.0.1:3000/' ],
  methods:["GET" , "POST" , "PUT", "DELETE"],
  credentials: true
}));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "bla",
  cookie: {
    maxAge: 43200000,
  }
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
