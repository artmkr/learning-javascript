var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(3000, function() {
    console.log("express has started on port 3000");
});


module.exports = app;