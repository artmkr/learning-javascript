var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// view engine, logger and staticfiles setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('body-parser')

parseUrlencoded = bodyParser.urlencoded({
    extended: true
});

var tasks = ['create TODO list', 'check first task', 'do nothing'];

/* GET home page. */
app.get('/', function(req, res) {
    res.render('index', {
        tasks: tasks
    });
});

app.post('/', parseUrlencoded, function(req, res) {
    task = req.body.task;
    tasks.push(task);
    res.status(201).json(task);
});

app.listen(3000, function() {
    console.log("express has started on port 3000");
});
module.exports = app;