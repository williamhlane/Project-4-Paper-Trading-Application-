const GandS = () => {
    //This is the graph and search componite. Here you will be able to search for a stock and view the graph.
    let stockname = "BHP - BHP Group Limited";

    return (
        <div id="left">
            <input className="search" type="search" />
        <div> {stockname}  <button className="buy">Buy</button> <button className="sell">Sell</button></div>
        
        <canvas id="chart">

        </canvas>
        </div>
    )
}
export default GandS;