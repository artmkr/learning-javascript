var express = require('express');
var app = express();
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shop');

var Item = mongoose.model('Item', { name: String,price: Number });

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/shop', function(req, res){
  Item.find({}, function(err, items) {
    var itemMap = [];
    items.forEach(function(item) {
      itemMap.push({name:item.name, price: item.price});
    });
    res.send(itemMap);
  });
});


app.post('/shop', function(req, res){
  var newItem = Item({name:"Hello" , price:3});
  newItem.save(function(err) {
  if (err) throw err;
    console.log('User created!');
  });
  res.status(201).send();
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
