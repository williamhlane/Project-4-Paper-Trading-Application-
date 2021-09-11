import { useState } from 'react';
import Row from './Row';
const Portfolio = ({ setStockSelected, stockSelected, balance }) => {
    //NOTES UNEXCEPTED BEHAVIOUR when selecting new radio button it requires it to be clicked twice before the radio button will change but the value gets 
    //changed on the first click. 
    const [buySell, setBuySell] = useState();
    console.log("Render");
    const onSub = (e) => {
        e.preventDefault();

        console.log(document.getElementById("selectBS").value);
        console.log(document.getElementById("amount").value);
    }
    let buySelected, sellSelected;
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
                        <Row stock="MS" quantity="20" value="10" oddeven="0" id="0" setStockSelected={setStockSelected} noRadio={false} stockSelected={stockSelected} />
                        <Row stock="OSS" quantity="25" value="16" oddeven="1" id="1" setStockSelected={setStockSelected} noRadio={false} stockSelected={stockSelected} />
                        <Row stock="BGD" quantity="30" value="18" oddeven="2" id="2" setStockSelected={setStockSelected} noRadio={false} stockSelected={stockSelected} />


                        <Row stock="Balance" quantity="" value={balance} oddeven="1" id="4" noRadio="" />
                    </div>
                    <div>
                        <span style={{ display: "block" }}><strong>Stock</strong>: {stockSelected} you have 30 shares at $40.00 per share.</span>
                        <span style={{ display: "block" }}><strong>MS</strong>: <input type="text" className="amount" id="amount" />

                            <select id="selectBS" className={(buySell == "sell") ? "sell" : "buy"} onChange={(e) => setBuySell(e.target.value)} >
                                <option value="buy" className="buy">Buy</option>
                                <option value="sell" className="sell">Sell</option>

                            </select>
                            <button className="okay">Okay</button>
                        </span>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Portfolio;