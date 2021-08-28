import Row from './Row';
const Portfolio = () => {
    let radioSelected;
    const setRadioSelected = (id) => radioSelected = id;
    const onSub = (e) => {
        e.preventDefault();
        console.log(radioSelected);
    }
    return (
        <div id="right">
            <h4>Portfolio</h4>
            <div id="GridBoxBig">

                <form onSubmit={onSub}>
                    <div className="gridContainer">
                        <Row />
                        {/*This is the end on the top
                     stock, quantity, value, id, oddenven
                    */}
                        <Row stock="MS" quantity="20" value="10" oddeven="1" id="1" setRadioSelected={setRadioSelected} />
                        <Row stock="OSS" quantity="25" value="16" oddeven="0" id="2" setRadioSelected={setRadioSelected} />
                        <Row stock="BGD" quantity="30" value="18" oddeven="1" id="3" setRadioSelected={setRadioSelected} />
                    </div>
                    <div>
                        <span style={{ display: "block" }}><strong>MS</strong>: you have 30 shares at $40.00 per share.</span>
                        <input type="text" className="amount" />

                        <select className="buy">
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