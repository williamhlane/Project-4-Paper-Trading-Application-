import { useState } from 'react';
import { Line } from 'react-chartjs-2';
const GandS = () => {
    //start is the date the users starts there search from
    const [start, setStart] = useState();
    //End where the user puts as the end date.
    const [end, setEnd] = useState();//end date in the users search
    const [stockName, setStockName] = useState("Search for a stock using the symbol");//This is the stockname to be used for displaying it to the user.
    const [startDataDate, setStartDataDate] = useState('XX-XX-XXXX');//This is the first date that data is available. 
    const [endDataDate, setEndDataDate] = useState('XX-XX-XXXX');//This the llast date that has information available.
    const [chartLabels, setChartLabel] = useState();//This useState will store the chart label information.
    const [chartData, setChartData] = useState();//This use state will store the chart data information.
    const [stockSym, setStockSym] = useState();//This use state will store the stocksymbol
    //This is the graph and search componite. Here you will be able to search for a stock and view the graph.
    const getStockHistory = async (stockSymbol) => {
        setStockSym(setStockSym);
        //We want stock symbols only, no spaces, all spaces will be removed if one is entered by mistake
        stockSymbol = stockSymbol.replace(/ /g, "");
        if (stockSymbol.length === 0) {
            //An error needs to be sent to the user prompting them to fill out the text box to search.
            alert("Nothing was entered in the search box.");
        } else {
            const apiKey = "";
            //When the user they will hit enter and it will replace any stock name with this until the promise returns good or bad.
            setStockName("Loading please wait.");
            await fetch(`https://www.quandl.com/api/v3/datasets/WIKI/${stockSymbol}.json?start_date=${start}&end_date=${end}&api_key=${apiKey}`)
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    //labels is a temporary array that will only be used in the promise, it will build up the labels and be
                    //put in a useState at the end, the stockData array will do the same thing just with the data.
                    let labels = [];
                    let stockData = [];
                    for (let i = 0; i < data.dataset.data.length; i++) {
                        ///DATE: console.log(data.dataset.data[i][0]);
                        //CLOSING: console.log(data.dataset.data[i][4]);
                        //This will put the dates in an array so we can use them as labels on the graph
                        labels.push(data.dataset.data[i][0]);
                        //This will put the closing stock prices in an array so we can draw the graph with them.
                        stockData.push(data.dataset.data[i][4]);
                    }
                    //Use useState for the label and graph array
                    setChartLabel(labels);
                    setChartData(stockData);
                    //Remove unwanted text from the stockName
                    setStockName(data.dataset.name.replace(/Prices, Dividends, Splits and Trading Volume/, ''));
                    //Store the dates that we have information for using use state so it can be shown to the end user.
                    setStartDataDate(data.dataset.oldest_available_date);
                    setEndDataDate(data.dataset.newest_available_date);
                }).catch((error) => {
                    setStockName(`Error, loading ${stockSymbol} please try again.`);
                    alert("An error has occured with your search, please check the symbol, dates and try again. If all is correct the symbol may not be in the system.")
                    console.log("Error", error);
                })
        }
    }
    //This is the options object for the graph.
    const options = {
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    };
    //This if and llabel variable will let us show the proper label above the graph.
    let llabel = "";
    if (stockName === "Search for a stock using the symbol") {
        llabel = `${stockName}.`;
    } else if(stockName === `Error, loading ${stockSym} please try again.`) {
        llabel = `${stockName}`;
    } else {
        llabel = `Closing prices per day for ${stockName}.`;
    }
    return (
        <div id="left">
            <input className="search" type="search" onKeyDown={(e) => { if (e.key === 'Enter') { getStockHistory(e.target.value) } }} />
            <input type="date" onChange={(e) => { setStart(e.target.value) }} />
            <input type="date" onChange={(e) => { setEnd(e.target.value) }} />
            <div> {stockName}<br /> Information from {startDataDate} to {endDataDate} available. <button className="buy">Buy</button> <button className="sell">Sell</button></div>

            <Line data={{
                labels: chartLabels,
                datasets: [
                    {
                        label: llabel,
                        data: chartData,
                    }
                ],

            }}
                options={options}
                id="chart" />
        </div>
    )
}
export default GandS;