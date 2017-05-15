'use strict';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let rp = require('request-promise');
let index = require('./routes/index');
let authors = require('./routes/authors');
let books = require('./routes/books');

let hbs = require('hbs');
let hbsUtils = require('hbs-utils')(hbs);

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'skilluplogo.ico')));
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
hbsUtils.registerPartials(path.join(__dirname, 'views'), {
 match: /\/?.*_.*\.(html|hbs)$/,
 name: (name) => {
   let pathArr = name.split('/');
   let last = pathArr.length - 1;
   pathArr[last] = pathArr[last].slice(1);
   let newName = pathArr.join('/');

   return newName;
 }
});

app.use('/', index);
app.use('/authors', authors);
app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
