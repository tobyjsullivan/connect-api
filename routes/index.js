var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/people', function(req, res, next) {
  var person = { personId: "some-id", name: "Person1" };
  res.json(person);
});

module.exports = router;
