const Portfolio = () => {

    return (
        <div id="right">
            <h4>Portfolio</h4>
            <div id="GridBoxBig">

                <form>
                <div className="gridContainer">
                    <span className="gridItem gh">Stock</span>
                    <span className="gridItem gh">Quantity</span>
                    <span className="gridItem gh">Value</span>
                    <span className="gridItem gh">Buy/Sell</span>
                    {/*This is the end on the top*/}
                    <span className="gridItem">MS</span>
                    <span className="gridItem">5</span>
                    <span className="gridItem">$10</span>
                    <span className="gridItem"><input type="radio"  name="a"/></span>
                    {/*This is the end on the top geo - grid every other*/}
                    <span className="gridItem geo">MS</span>
                    <span className="gridItem geo">5</span>
                    <span className="gridItem geo">$10</span>
                    <span className="gridItem geo"><input type="radio"  name="a"/></span>
                </div>
                <div>
                    <span style={{display:"block"}}><strong>MS</strong>: you have 30 shares at $40.00 per share.</span>
                    <input type="text" /><button>Buy</button><button>Sell</button>
                </div>
                </form>

            </div>
        </div>
    )
}
export default Portfolio;