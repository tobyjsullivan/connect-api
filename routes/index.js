var express = require('express');
var uuid = require('node-uuid');

var router = express.Router();

/* GET home page. */
var statusController = function(req, res, next) {
  var currentStatus = { status: "OK" };

  var statuses = [currentStatus];
  res.json(statuses);
}

router.get('/', statusController);

router.get('/statuses', statusController);

router.post('/people', function(req, res, next) {
  var id = uuid.v4();
  var name = "Person"+id.substring(0,6);

  var person = { personId: id, name: name };
  res.json(person);
});

module.exports = router;
