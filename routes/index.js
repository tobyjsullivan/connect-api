var express = require('express');
var uuid = require('node-uuid');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/people', function(req, res, next) {
  var id = uuid.v4();
  var name = "Person"+id.substring(0,6);

  var person = { personId: id, name: name };
  res.json(person);
});

module.exports = router;
