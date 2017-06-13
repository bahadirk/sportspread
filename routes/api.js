var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/users', function(req, res, next) {
  User.find(function(err, users){
    if(err){
      res.send(err);
    }
    res.send(users);
  });
});


/* GET user with id. */
router.get('/users/:id', function(req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function(err, user){
    if(err){
      res.send(err);
    }
    res.send(user);
  });
});



module.exports = router;
