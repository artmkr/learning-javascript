var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser')
var app = express();

// view engine, logger and staticfiles setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


parseUrlencoded = bodyParser.urlencoded({
    extended: true
});

var tasks = ['Create TODO list', 'Check first task', 'You are awesome'];

/* GET home page. */
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/tasks', function(req, res) {
    res.status(200).json(tasks);
});

app.post('/tasks', parseUrlencoded, function(req, res) {
    task = req.body.task;
    tasks.push(task);
    res.status(201).json(task);
});

app.delete('/tasks/:task', function(req, res) {
    var delete_task = req.params.task;
    console.log(delete_task);
    var index = tasks.indexOf(delete_task);
    if (index > -1) {
        tasks.splice(index, 1);
    }
    res.status(202).send('OK');
});

app.listen(3000, function() {
    console.log("express has started on port 3000");
});




module.exports = app;