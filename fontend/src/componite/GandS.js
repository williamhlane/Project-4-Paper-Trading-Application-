import { Line } from 'react-chartjs-2';
const GandS = ({chartLabels, chartData, stockName, getStockHistory,setStart, setEnd, startDataDate, endDataDate, stockSym }) => {
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
    } else if (stockName === `Error, loading ${stockSym} please try again.`) {
        llabel = `${stockName}`;
    } else {
        llabel = `Closing prices per day for ${stockName}.`;
    }
    return (
        <div id="left">
            <input className="search" type="search"  onKeyDown={(e) => { if (e.key === 'Enter') { getStockHistory(e.target.value) } }} />
            <input type="date" onChange={(e) => { setStart(e.target.value) }} />
            <input type="date" onChange={(e) => { setEnd(e.target.value) }} />
            <div>
                {stockName}<br /> Information from {startDataDate} to {endDataDate} available.
            </div>
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
