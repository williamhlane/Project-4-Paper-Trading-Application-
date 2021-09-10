var express = require('express');
var router = express.Router();
var db = require('../lib/databaseconnect');
var models = require('../lib/models');
var users = models.Users;




/*This is the log in route, it */
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
        res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
       res.write(`{ "status" : "Logged In", "username" : "${req.session.username}" } `);
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
  });




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
