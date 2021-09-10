import './App.css';
//GandS is the graph and search componite
import GandS from './componite/GandS';
//Portfolio is the componite showing the stocks owned and gives the option to buy or sell
import Portfolio from './componite/PortFolio';
//This is the log in form, it will be shown if the user is not logged in.
import Login from './componite/Login';
//This will be the logged in variable, this will be replaced later with the session object being passed from server to front end
import { useState } from 'react';



let loggedIn = 0;
function App() {
  const [buySellStock, setBuySellStock] = useState(null);
  const [appState, setAppState] = useState();
  if (typeof (appState) !== 'undefined') {
    console.log('appState is defined');
  } else {
    console.log('appState is not defined');
  }
  const setBuySellStock2 = (stockName, doWhat, amount) => {


  }

  return (
    <div className="App">
      <header className="App-header" >
        <h1> Paper Trader</h1>
        {loggedIn ? <div id='logout'>Welcome, William   <a href='/'>Logout</a></div> : <div id='logout'>Please log in below.</div>}

      </header>
      {loggedIn ? <GandS /> : <Login />}
      {loggedIn ? <Portfolio /> : null}
    </div>
  );
}

export default App;
