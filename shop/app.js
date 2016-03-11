var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

parseUrlencoded = bodyParser.urlencoded({
    extended: true
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop');

var Item = mongoose.model('Item', {
    name: String,
    price: Number
});

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/shop', function(req, res) {
    Item.find({}, function(err, items) {
        var itemMap = [];
        items.forEach(function(item) {
            itemMap.push({
                name: item.name,
                price: item.price
            });
        });
        res.send(itemMap);
    });
});


app.post('/shop', parseUrlencoded, function(req, res) {
    if (req.body.name && req.body.price) {
        var newItem = Item({
            name: req.body.name,
            price: req.body.price
        });
        newItem.save(function(err) {
            if (err) throw err;
            res.status(201).send();
        });
    } else {
        res.status(204).send();
    }
});

app.delete('/shop/:name', function(req, res) {
    var delete_item = req.params.name;
    // get the user starlord55
    Item.findOneAndRemove({
        name: delete_item
    }, function(err) {
        if (err) throw err;
        console.log('User successfully deleted!');
        res.status(202).send('OK');
    });
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});