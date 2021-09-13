import './App.css';
//GandS is the graph and search componite
import GandS from './componite/GandS';
//Portfolio is the componite showing the stocks owned and gives the option to buy or sell
import Portfolio from './componite/PortFolio';
//This is the log in form, it will be shown if the user is not logged in.
import Login from './componite/Login';
import { useState } from 'react';
//import { useCookies } from "react-cookie";
/////////////////////////////////////////////////////////////
/////////TODO LIST//IN ORDER//DELETE this AFTER DEVELOPMENT IS DONE
//NEED TO Set value of stock under the list 
//NEED TO BUY AND SELL STOCKS
//DELETE COOKIE IS NOT WORKING
//NEED TO BE ABLE TO RESET USERS//done not tested
////////////////////////////////////////////////////////////
let loggedIn = 0;
let loggedInAs;
let balance;
function App() {
  //const [cookies, setCookie, removeCookie] = useCookies(["connect.sid"]);//Delete cookie is not working on logout
  const [appState, setAppState] = useState();//appState is an object that store the logged authenticate and username.
  const [stockSelected, setStockSelected] = useState();
  const [stockSelectedPrice, setStockSelectedPrice] = useState();
  //start is the date the users starts there search from
  const [start, setStart] = useState('1792-05-17');
  //End where the user puts as the end date.
  const [end, setEnd] = useState('2099-01-01');//end date in the users search
  const [stockName, setStockName] = useState("Search for a stock using the symbol");//This is the stockname to be used for displaying it to the user.
  const [startDataDate, setStartDataDate] = useState('XX-XX-XXXX');//This is the first date that data is available. 
  const [endDataDate, setEndDataDate] = useState('XX-XX-XXXX');//This the llast date that has information available.
  const [chartLabels, setChartLabel] = useState();//This useState will store the chart label information.
  const [chartData, setChartData] = useState();//This use state will store the chart data information.
  const [stockSym, setStockSym] = useState();//This use state will store the stocksymbol
  const apiKey = "";
  //This is the graph and search componite. Here you will be able to search for a stock and view the graph.
  const getStockHistory = async (stockSymbol) => {
     setStockSym(stockSymbol);
    //We want stock symbols only, no spaces, all spaces will be removed if one is entered by mistake
    stockSymbol = stockSymbol.replace(/ /g, "");
    if (stockSymbol.length === 0) {
      //An error needs to be sent to the user prompting them to fill out the text box to search.
      alert("Nothing was entered in the search box.");
    } else {
      
      //When the user they will hit enter and it will replace any stock name with this until the promise returns good or bad.
      setStockName("Loading please wait.");
      setStockSelected(stockSymbol);
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
          setStockSelectedPrice(data.dataset.data[0][4]);
          //Use useState for the label and graph array
          setChartLabel(labels);
          setChartData(stockData);
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
  if (typeof (appState) !== 'undefined') {
    loggedIn = (appState.authenticated === "true");
    loggedInAs = appState.username;
    balance = appState.balance;
    //console.log(JSON.stringify(appState));
    
  } else {
    fetch('http://localhost:3001/users/login', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      setAppState(JSON.parse(JSON.stringify(res)));
    }).catch((error) => {
      console.log("Error 1" + error);
    });
  }
  const logOut = () => {

    //removeCookie('connect.sid');//Cookie is not getting deleted need to research why.
    fetch('http://localhost:3001/users/logout', { mode: 'cors', credentials: 'include' })
      .then(() => { window.location.reload(); })
      .catch((error) => { console.log(`Log out error: ${error}`) })
  }
  const restUser = () => {
    fetch(`http://localhost:3001/users/reset/${loggedInAs}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.results === "DONE") {
        window.location.reload();
      }
      alert(res.results);
    }).catch((error) => {
      console.log("Error 2" + error);
    });
  }
  const deleteUser = () => {
    fetch(`http://localhost:3001/users/deleteuser/${loggedInAs}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if (res.results === "DONE") {
        logOut();
      }
      alert(res.results);
    }).catch((error) => {
      console.log("Error 3" + error);
    });
  }

  return (
    <div className="App">
      <header className="App-header" >
        <h1> Paper Trader</h1>
        {loggedIn ? <div id='logout'>Welcome, {(typeof (loggedInAs) !== 'undefined') ? loggedInAs : null}  <button onClick={logOut}> Logout </button></div> : <div id='logout'>Please log in below.</div>}
        {loggedIn ? <button onClick={restUser}> Reset User {loggedIn} </button> : null}
        {loggedIn ? <button onClick={deleteUser}> Delete User {loggedIn} </button> : null}
      </header>
      {loggedIn ? <GandS chartLabels={chartLabels} chartData={chartData}
        stockName={stockName} getStockHistory={getStockHistory} setStart={setStart} setEnd={setEnd}
        startDataDate={startDataDate} endDataDate={endDataDate} stockSym={stockSym} /> : <Login setAppState={setAppState} stockSym={stockSym} />}
      {loggedIn ? <Portfolio setStockSelected={setStockSelected} 
                  stockSelected={stockSelected} balance={balance} getStockHistory={getStockHistory} 
                  stocksObject={appState.stocksOwned} apiKey={apiKey} loggedInAs={loggedInAs} stockSelectedPrice={stockSelectedPrice} /> 
                  : null}
    </div>
  );
}

export default App;
