var express = require('express');
var app = express();

var path = require('path');
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        io.emit('message', msg);
    });
});


http.listen(3000, function() {
    console.log("express has started on port 3000");
});


module.exports = app;