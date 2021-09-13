var express = require('express');
var router = express.Router();
var models = require('../lib/models');
var Portflio = models.Portflio;
var users = models.Users;
router.post('/buysell', async (req, res, next) => {
  console.log('username', req.session.username);
  const username = req.body.username;
  if (req.session.authenticated && (username === req.session.username)) {
    await users.findOne({
      where: {
        username: `${req.session.username}`
      }
    }).then((data) => {
      if (req.body.buySell == 'buy') {
        let newBalance = data.balance - (req.body.stockSelectedPrice * buySellAmount);
      } else if (req.body.buySell == 'sell') {
        let newBalance = data.balance + (req.body.stockSelectedPrice * buySellAmount);
      }
      if (newBalance > 0) {
        ///UDATE BALANCE OF USER/////
        users.update({ balance: `${newBalance}` },
          {
            where: {
              username: `${username}`
            }
          }).catch((error) => {
            console.log(error);
          })
        //////////////////////////
        const updatePortfolio = async (amount) => {
          await Portflio.update({ amountOwned: `${amount}` },
            {
              where: {
                username: username,
                stockName: `${req.body.stockSelected}`
              }
            }).catch((error) => {
              console.log(error);
            })
        }
        ////Get amount owned now and add or subtract it
        const findStock = Portflio.findOne(
          {
            where: {
              username: `${username}`,
              stockName: `${req.body.stockSelected}`
            }
          }).catch((error) => {
            console.log(error);
          })
        if (!findStock) {
          updatePortfolio(buySellAmount);
        } else {
          findStock.then((data) => {
            if (buySell === "buy") {
              updatePortfolio(data.amountOwned - (buySellAmount * req.body.buySellAmount));
            } else if (buySell === "sell") {
              updatePortfolio(data.amountOwned - (buySellAmount * req.body.buySellAmount));
            }
          })
        }
        ////////////////////////////
        let resWrite = `{ "status" : "sucess" , "newBalance" : "${newBalance}"}`;
      } else {
        let resWrite = `{ "status" : "failed" }`;
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
      res.write(`{ "results" : "${error}" }`);
      res.end()
    })
  } else {
    console.log("not logged in");
    res.send(`{ "Results" : "Failed not logged in." }`);
  }
});
module.exports = router;
