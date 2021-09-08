var express = require('express');
var router = express.Router();
var db = require('../lib/databaseconnect');

/*This is the log in route, it */
router.post('/login', function(req, res, next) {
  //res.send('respond with a resource');
  
});
router.post('/create', function(req, res, next) {
  let username = req.body.createusername;
  let password = req.body.createpassword;
  //console.log(req.headers);
  //console.log(JSON.parse(req.body));

 // res.setHeader('Access-Control-Allow-Credentials', true);//not Needed no Cookie
 /* res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
*/
  res.send(`{ "Username" : "${username}" , "Password" : "${password}" }`);
  //res.write(`{ "username" : "${username}" , "password" : "${password}" }`);
  //res.end();
});


module.exports = router;
