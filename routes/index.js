var _ = require('underscore');
var express = require('express');
var uuid = require('node-uuid');

var router = express.Router();

var validKeys = [];
var people = [];

/* GET home page. */
var statusController = function(req, res, next) {
  var currentStatus = { status: "OK" };

  var statuses = [currentStatus];
  res.json(statuses);
};

var getAuthKey = function(req) {
  if (req === undefined) {
    throw Error("Expected arg req");
  }

  if (req.headers === undefined) {
    throw Error("Could not find headers obj. Are you sure req is a request object?");
  }

  var authHeader  = req.headers['x-authentication'];

  if (authHeader == undefined) {
    console.log(req.headers);
    throw Error("Header 'X-Authentication' must be supplied for this request")
  }

  if (!_.contains(validKeys, authHeader)) {
    console.log(validKeys);
    throw Error("That key is invalid.");
  }

  return authHeader;
};

router.get('/', statusController);

router.get('/statuses', statusController);

router.post('/authkeys', function(req, res, next) {
  var newKey = uuid.v4();

  validKeys.push(newKey);

  var key = { authKey: newKey };
  res.json(key);
});


router.post('/people', function(req, res, next) {
  var key = getAuthKey(req);

  // Look for an existing person
  var person = _.find(people, function(e) {
    return e.key == key;
  });

  if (person === undefined) {
    var id = uuid.v4();
    var name = "Person_"+id.substring(0,6);

    person = { personId: id, name: name, key: key };
    people.push(person);
  }
  res.json(person);
});

module.exports = router;
