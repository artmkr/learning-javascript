var express = require('express');
var router = express.Router();

var tasks = ['create TODO list', 'check first task', 'do nothing'];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        tasks: tasks
    });
});

module.exports = router;