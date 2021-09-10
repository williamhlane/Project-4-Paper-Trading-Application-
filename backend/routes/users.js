var express = require('express');
const { session } = require('passport');
var router = express.Router();
var db = require('../lib/databaseconnect');
var models = require('../lib/models');
var users = models.Users;
//This get request is used by fetch on page load to check if the user is logged in or not.
router.get('/login', (req, res, next) => {
  if (req.session) {
    console.log(req.session);
    res.send(`{ "authenticated" : "${req.session.authenticated}", "username" : "${req.session.username}" }`);
  } else {
    res.send(`{ "authenticated" : "false", "username" : "null" }`);
  }
});
//This route is called using fetch by a function in app.js
router.get('/logout', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  req.session.destroy((error) => {
    if (typeof (error) == 'undefined') { console.log("Error: " + error); }
  });
  res.write(`{ "status" : "Logged Out"}`);
  res.end();
});
/*This is the log in route, it is called by fetch in the log in componite.*/
router.post('/login', (req, res) => {
  let returnResponce = '';
  users.findOne({
    where:
    {
      username: `${req.body.loginusername}`
    }
  }).then((nextThing) => {

    if (nextThing !== null) {
      if (nextThing.password == req.body.loginpassword) {
        if (req.session.viewCount) {
          req.session.viewCount += 1;
        } else {
          req.session.viewCount = 1;
        }
        req.session.authenticated = "true";
        req.session.username = req.body.loginusername;
        console.log(req.session.authenticated + req.session.username + req.session.viewCount);
        res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.send(`{ "authenticated" : "${req.session.authenticated}", "username" : "${req.session.username}" }`);
        res.end();

      } else {
        res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.write(`{ "status" : "Wrong password." }`);
        res.end();
      }
    } else {
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.write(`{ "status" : "Wrong username." }`);
      res.end();

    }
  }).catch((error) => {
    console.log(`Error 1: ${error}`);
  })




});

router.post('/create', async (req, res, next) => {

  await users.count({ where: { 'username': req.body.createusername } }).then((count) => {
    if (count == 0) {
      users.create({
        username: req.body.createusername,//username: {type: DataTypes.STRING,allowNull: false},
        password: req.body.createpassword,//password: {type: DataTypes.STRING,allowNull: false},
        balance: 8000,//balance:{type: DataTypes.BIGINT,allowNull: true},
        stocksOwned: null//stocksOwned: { type: DataTypes.STRING, allowNull: true

      }).then((a) => {
        res.send(`{ "status" : "success", "username" : "${req.body.createusername}" }`);

      }).catch((error) => {
        res.send(`{ "status" : "Error: ${error}"}`);

      });
    } else {
      console.log("User does exist.")

      res.send(`{ "status" : "Error: That user already exists."}`);

    }
  }).catch((error) => {
    console.log(error);

    res.send(`{ "Error" : "${error}" }`);

  });

});


module.exports = router;
