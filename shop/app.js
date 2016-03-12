var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

parseUrlencoded = bodyParser.urlencoded({
    extended: true
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop');


var Schema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    count: Number,
    image: String
});

Schema.methods.buy = function() {
    if (this.count === 0) return 0;
    else {
        this.count -= 1;
        this.save();
        return 1;
    }
};

var Item = mongoose.model('Item', Schema);

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
            itemMap.push(item);
        });
        res.send(itemMap);
    });
});


app.post('/shop', parseUrlencoded, function(req, res) {
    if (req.body.name && req.body.price) {
        var newItem = Item({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            count: req.body.count,
            description: req.body.description
        });
        newItem.save(function(err) {
            if (err) throw err;
            res.status(201).send();
        });
    } else {
        res.status(204).send();
    }
});

app.put('/shop/:name', function(req, res) {
    var bought_item = req.params.name;
    Item.find({
        name: bought_item
    }, function(err, items) {
        item = items[0];
        if (item.buy() === 0) res.status(404).send('items sold')
        else res.status(202).send('OK');
    })
});

app.delete('/shop/:name', function(req, res) {
    var delete_item = req.params.name;
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