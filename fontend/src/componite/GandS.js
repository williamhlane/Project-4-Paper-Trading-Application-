import { useState } from 'react';
const GandS = () => {
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [stockName, setStockName] = useState("Search for a stock using the symbol")
    //This is the graph and search componite. Here you will be able to search for a stock and view the graph.
    

    //use fetch for the quandl

    const getStockHistory = async (stockSymbol) => {
        //We want stock symbols only, no spaces, all spaces will be removed if one is entered by mistake
        stockSymbol = stockSymbol.replace(/ /g, "");

        //This is left in during the development to set the inputs//////////////////////////
        //if(stockSymbol == null){console.log("null");}
        //if(stockSymbol == ''){console.log("empty");}
        //if(stockSymbol.length === 0){console.log("empty");} else { console.log(stockSymbol); }
        ////////////////////////////////////////////////////////////////////////////////////
        


        if (stockSymbol.length === 0) {
            console.log("empty");
        } else {
            const apiKey = "";
            
            //useState for start date and end date.
            await fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockSymbol}.json?start_date=${start}&end_date=${end}&api_key=${apiKey}`)
                .then((res) => {
                    //console.log(res);
                    return res.json();
                }).then((data) => {
                   //first dates data 
                   for (let i = 0; i < data.dataset.data.length; i++) {

                    console.log(data.dataset.data[i]);
                   }
                   setStockName(data.dataset.name);
                   console.log(data.dataset.name);
                   console.log(data.dataset.data.length);

                    console.log(data.dataset.newest_available_date, data.dataset.oldest_available_date);
                    /*



                    */
                }).catch((error) => {
                    console.log(error);
                })
        }


    }


    return (
        <div id="left">
            <input className="search" type="search" onKeyDown={(e) => { if (e.key === 'Enter') { getStockHistory(e.target.value) } }} />
            <input type="date" onChange={(e) => { setStart(e.target.value)}} />
            <input type="date" onChange={(e) => {setEnd(e.target.value)}} />
            <div> {stockName}  <button className="buy">Buy</button> <button className="sell">Sell</button></div>

            <canvas id="chart">

            </canvas>
        </div>
    )
}
export default GandS;