var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galeriaRouter = require('./routes/galeria');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

//api routes
var usermanagerRouter = require('./api/usermanager')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
const sessions = require('express-session')
app.use(sessions({
  secret:"tajnawartosc",
  saveUninitialized:true,
  cookie:{maxAge:1000*60*60*24}, //jeden dzien
  resave:false
}))

//public
app.use('/', indexRouter);
app.use('/galeria', galeriaRouter);
app.use('/user', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);


//api
app.use('/api/', usermanagerRouter)


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
