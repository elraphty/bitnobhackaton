const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const bodyParser = require("body-parser")

const shopRouter = require('./routes/shops');
const usersRouter = require('./routes/users');
const giftcardRouter = require('./routes/giftcards');


const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json())



app.use('/', shopRouter);
app.use('/giftcards', giftcardRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message || "Internal Server Error";
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
