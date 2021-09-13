var express = require('express');
var router = express.Router();
var models = require('../lib/models');
const { Sequelize, DataTypes } = require('sequelize');
var Portflio = models.Portflio;
var users = models.Users;
//{ "username" : "harrison", "buySell" : "buy", "stockSelected" : "f", "stockSelectedPrice" : "10.83", "buySellAmount" : "2" }
router.post('/buysell', async (req, res, next) => {
  console.log('username', req.session.username);
  let resWrite = '';
  const username = req.body.username;

  if (req.session.authenticated && (username === req.session.username)) {

    const updatePortfolio = async (amount) => {
      await Portflio.update({ amountOwned: `${amount}` },
        {
          where: {
            username: req.body.username,
            stockName: `${req.body.stockSelected}`
          }
        }).catch((error) => {
          console.log(error);
        })
    }
    const updatePortfolioAddStock = async (amount) => {
      await Portflio.create({
        stockName: `${req.body.stockSelected}`,
        amountOwned: `${amount}`,
        username: `${req.body.username}`
      }).catch((error) => {
        console.log(error);
      })
    }
    await users.findOne({
      where: {
        username: `${req.session.username}`
      }
    }).then((data) => {
      let newBalance;
      if (req.body.buySell === 'buy') {
        newBalance = data.balance - (req.body.stockSelectedPrice * req.body.buySellAmount);
      } else if (req.body.buySell === 'sell') {
        newBalance = data.balance + (req.body.stockSelectedPrice * req.body.buySellAmount);
      }
      if (data.balance > 0) {
        ///UDATE BALANCE OF USER/////
        users.update({ balance: `${newBalance}` },
          {
            where: {
              username: `${username}`
            }
          }).catch((error) => {
            console.log(error);
          })
        let a;
        Portflio.count({ where: { username: `${req.body.username}`, stockName: `${req.body.stockSelected}` } })
          .then((data) => {
            console.log("data " + data + typeof (data));
            if (parseInt(data) === 0) {
              if (req.body.buySell === "buy") {
                updatePortfolioAddStock(parseInt(req.body.buySellAmount));
                console.log("add" + req.body.buySellAmount);
              } else if (req.body.buySell === "sell") {
                resWrite = `{ "status" : "You have no shares to sell." }`;
              }
            } if (parseInt(data) > 0) {
              if (req.body.buySell === "buy") {
                updatePortfolio(ob.amountOwned + parseInt(req.body.buySellAmount));
              } else if (req.body.buySell === "sell") {
                updatePortfolio(ob.amountOwned - parseInt(req.body.buySellAmount));
              }
            }
          })

        resWrite = `{ "status" : "Transaction Complete" }`;
      } else {
        resWrite = `{ "status" : "You do not have enough money to purchase this." }`;
      }

      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.write(resWrite);
      res.end()
    }).catch((error) => {
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      console.log("catch error", error);
      res.write(`{ "Results 2" : "${error}" }`);
      res.end()
    })
  } else {
    console.log("not logged in");
    res.send(`{ "Results 1" : "Failed not logged in." }`);
  }
});
module.exports = router;
