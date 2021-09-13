var express = require('express');
const { session } = require('passport');
var router = express.Router();
var db = require('../lib/databaseconnect');
var models = require('../lib/models');
var users = models.Users;
var Portflio = models.Portflio;
//This get request is used by fetch on page load to check if the user is logged in or not.

router.get('/login', (req, res, next) => {
  if (req.session) {
    users.findOne({
      where: { username: `${req.session.username}` }
    }).then((data) => {
      res.send(`{ "authenticated" : "${req.session.authenticated}", "username" : "${req.session.username}", 
      "balance" : "${data.balance}" }`);
    }).catch((error) => {

    })
  } else {
    res.send(`{ "authenticated" : "false", "username" : "null" }`);
  }
});
router.post('/portfolio', (req, res, next) => {
  console.log('username', req.session.username);
  const username = req.body.username;
  if (req.session.authenticated && (username === req.session.username)) {
    let portfolio = [];
    Portflio.findAll({
      where: { username: `${req.session.username}` }
    }).then((data) => {
      portfolio = JSON.parse(JSON.stringify(data));
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.write(JSON.stringify(portfolio));
      res.end()
    }).catch((error) => {
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      console.log("catch error", error);
      res.write(`{ "results" : "${error}" }`);
      res.end()
    })
  } else {
    console.log("not logged in");
    res.send(`{ "Results" : "Failed not logged in." }`);
  }
});
//This route is called using fetch by a function in app.js to log the user out
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
router.get('/deleteuser/:ex', (req, res, next) => {
  if (req.session.authenticated && (req.session.username === req.params.ex)) {
    users.destroy({
      where: {
        username: `${req.params.ex}`
      }
    }).then((done) => {
      Portflio.destroy({
        where: {
          username: `${req.params.ex}`
        }
      }).catch((error) => {
        console.log(error);
      })
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.write(`{ "results" : "DONE" }`);
      res.end();
    }).catch((error) => {
      console.log(error);
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.write(`{ "results" : "${error}" }`);
      res.end();
    });
  } else {
    res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.write(`{ "results" : "Not Authorized" }`);
    res.end();
  }
})
router.get('/resetuser/:ex', (req, res, next) => {
  if (req.session.authenticated && (req.session.username === req.params.ex)) {
    users.update({ balance: 8000 },
      {
        where: {
          username: `${req.params.ex}`
        }
      })
      .then((done) => {
        Portflio.destroy({
          where: {
            username: `${req.params.ex}`
          }
        }).catch((error) => {
          console.log(error);
        })
        res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.write(`{ "results" : "DONE" }`);
        res.end();
      }).catch((error) => {
        console.log(error);
        res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.write(`{ "results" : "${error}" }`);
        res.end();
      });
  } else {
    res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.write(`{ "results" : "Not Authorized" }`);
    res.end();
  }
})
router.post('/create', async (req, res, next) => {
  await users.count({ where: { 'username': req.body.createusername } }).then((count) => {
    if (count == 0) {
      let resSend;
      users.create({
        username: req.body.createusername,//username: {type: DataTypes.STRING,allowNull: false},
        password: req.body.createpassword,//password: {type: DataTypes.STRING,allowNull: false},
        balance: 8000,//balance:{type: DataTypes.BIGINT,allowNull: true},
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
