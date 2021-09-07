var express = require('express');
var router = express.Router();

/*This is the log in route, it */
router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  res.redirect('/');
});
router.put('/create', function(req, res, next) {
  
  res.send('respond with a resource');
});


module.exports = router;
