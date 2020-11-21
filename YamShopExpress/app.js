let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');
let boardRouter = require('./routes/board');
let cartRouter = require('./routes/cart');
let categoryRouter = require('./routes/category');
let deliveryRouter = require('./routes/delivery');
let fileRouter = require('./routes/file');
let paymentRouter = require('./routes/payment');
let petRouter = require('./routes/pet');
let productRouter = require('./routes/product');
let userTypeRouter = require('./routes/usertype');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/cart',cartRouter);
app.use('/category',categoryRouter);
app.use('/delivery',deliveryRouter);
app.use('/file',fileRouter);
app.use('/payment',paymentRouter);
app.use('/pet',petRouter);
app.use('/product',productRouter);
app.use('/usertype',userTypeRouter);

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
