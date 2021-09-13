import { useState } from 'react';
import Row from './Row';
const Portfolio = ({ setStockSelected, stockSelected, balance, getStockHistory, apiKey, loggedInAs, stockSelectedPrice }) => {
    const [buySell, setBuySell] = useState('buy');
    const [buySellAmount, setBuySellAmount] = useState();
    const [portforlioOb, setPortforlioOb] = useState([{ stockName: "Loading", amountOwned: "0", value: "0" }]);
    const [fetched, setFetched] = useState();
    const [userMessages, setUserMessages ] = useState();
    const onSub = (e) => {
        e.preventDefault();
    }
    const loadPortforlio = async () => {
        let tempPortfolio = [];
        const tempPortfolioBuilder = (push, count) => {
            tempPortfolio.push(push);
            if (tempPortfolio.length === count) {
                setPortforlioOb(tempPortfolio);
            }
        }

        ///FETCH LIST and put it in the tempPortfolioOb
        const body = `{ "username" : "${loggedInAs}" }`;
        await fetch('http://localhost:3001/users/portfolio', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        })
            .then((res) => {
                return res.json()
            }).then((res) => {
                for (let i = 0; i < res.length; i++) {
                    fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${res[i].stockName}.json?api_key=${apiKey}`)
                        .then((res) => {
                            return res.json();
                        }).then((data) => {
                            let value = JSON.parse(JSON.stringify(data));
                            tempPortfolioBuilder({ stockName: `${res[i].stockName}`, amountOwned: `${res[i].amountOwned}`, value: `${value.dataset.data[0][4]}` }, res.length);
                        }).catch((error) => {
                            console.log(error);
                        })
                }

                setFetched("true");
            }).catch((error) => {
                console.log(`Error fetch error : ${error}.`)
            });

    }
    if (fetched !== "true") {
        loadPortforlio();
       
    }
    let amountOwned;
    // portforlioOb.map((stock, index) => {
    for (let i = 0; i < portforlioOb.length; i++) {
        if (portforlioOb[i].stockName === stockSelected) {
            amountOwned = portforlioOb[i].amountOwned;
        }
    }
    const buySellStock = async () => {

        const body = `{ "username" : "${loggedInAs}", "buySell" : "${buySell}", 
        "stockSelected" : "${stockSelected}", "stockSelectedPrice" : "${stockSelectedPrice}", "buySellAmount" : "${buySellAmount}" }`;
        await fetch('http://localhost:3001/buysell', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((res) => {
                return res.json()               
        }).then((res) => {
            let responce = JSON.parse(JSON.stringify(res));
            setTimeout(() => { window.location.reload();  }, 0);
            setUserMessages(responce.status);
        })
       loadPortforlio();
    }
    setTimeout(() => { if(typeof(balance) === 'undefined') { window.location.reload(); } }, 0);
    return (
        <div id="right">
            <h4>Portfolio</h4>
            <div id="GridBoxBig">
                <form onSubmit={onSub}>
                    <div className="gridContainer">
                        <Row noRadio="Buy/Sell" />
                        {/*This is the top one only noRadio is required to remove the radio button by default it shows 
                        Stock, Quantity, Value, The last colum can be changed with noRadio or set to false that will have a radio
                         button id is the value sent back id, oddenven is for the backbround color change even numbers is white and odd is
                         light grey. If no values are past in then the row will default to grey */}

                        {portforlioOb.map((stock, index) => (
                            <Row key={index} stock={stock.stockName} quantity={stock.amountOwned} value={stock.value} oddeven={index + 1} id={index} setStockSelected={setStockSelected} noRadio={false} stockSelected={stockSelected} getStockHistory={getStockHistory} />
                        ))}
                        <Row stock="Balance" quantity="" value={balance} oddeven="1" id="4" noRadio="" />
                    </div>
                    <div>
                    <span style={{ display: "block" }}><strong>Messages:</strong>{userMessages}</span>
                        <span style={{ display: "block" }}><strong>Stock</strong>: {stockSelected} you have {amountOwned} shares at ${stockSelectedPrice} per share.</span>
                        <span style={{ display: "block" }}><strong>MS</strong>: <input type="text" onChange={(e) => setBuySellAmount(e.target.value)} className="amount" id="amount" />
                            <select id="selectBS" className={(buySell === "sell") ? "sell" : "buy"} onChange={(e) => setBuySell(e.target.value)} >
                                <option value="buy" className="buy">Buy</option>
                                <option value="sell" className="sell">Sell</option>

                            </select>
                            <button className="okay" onClick={buySellStock}>Okay</button>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Portfolio;