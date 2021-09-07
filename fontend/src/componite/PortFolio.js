import { useState } from 'react';
import Row from './Row';
const Portfolio = () => {
    //NOTES UNEXCEPTED BEHAVIOUR when selecting new radio button it requires it to be clicked twice before the radio button will change but the value gets 
    //changed on the first click. 
    const [radioSelected, setRadioSelected] = useState();
    const onSub = (e) => {
        e.preventDefault();
        console.log(radioSelected);
        console.log(document.getElementById("selectBS").value);
        console.log(document.getElementById("amount").value);
    }
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
                        <Row stock="MS" quantity="20" value="10" oddeven="0" id="0" setRadioSelected={setRadioSelected} noRadio={false} />
                        <Row stock="OSS" quantity="25" value="16" oddeven="1" id="1" setRadioSelected={setRadioSelected} noRadio={false} />
                        <Row stock="BGD" quantity="30" value="18" oddeven="2" id="2" setRadioSelected={setRadioSelected} noRadio={false} />


                        <Row stock="Balance" quantity="30" value="18" oddeven="1" id="4" noRadio="" />
                    </div>
                    <div>
                        <span style={{ display: "block" }}><strong>MS</strong>: you have 30 shares at $40.00 per share.</span>
                        <input type="text" className="amount" id="amount" />

                        <select id="selectBS"className="buy">
                            <option value="buy" className="buy">Buy</option>
                            <option value="sell" className="sell">Sell</option>
                        </select>
                        <button className="okay">Okay</button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default Portfolio;