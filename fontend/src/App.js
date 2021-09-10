import './App.css';
//GandS is the graph and search componite
import GandS from './componite/GandS';
//Portfolio is the componite showing the stocks owned and gives the option to buy or sell
import Portfolio from './componite/PortFolio';
//This is the log in form, it will be shown if the user is not logged in.
import Login from './componite/Login';
import { useState } from 'react';
import { useCookies } from "react-cookie";
/////////////////////////////////////////////////////////////
/////////TODO LIST//IN ORDER//DELETE LOST AFTER DEVELOPMENT IS DONE
//NEED TO BE ABLE TO DELETE AND RESET USERS
//NEED TO GRAPH STOCKS OWNED
//NEED TO BUY AND SELL STOCKS
//DELETE COOKIE IS NOT WORKING
////////////////////////////////////////////////////////////
let loggedIn = 0;
let loggedInAs;
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["connect.sid"]);//Delete cookie is not working on logout
  const [appState, setAppState] = useState();//appState is an object that store the logged authenticate and username.
  if (typeof (appState) !== 'undefined') {
    loggedIn = (appState.authenticated === "true");
    loggedInAs = appState.username;
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
      }).catch((error) =>{
        console.log(error);
      });
  }
const logOut = () => {
  
  removeCookie('connect.sid');//Cookie is not getting deleted need to research why.
  fetch('http://localhost:3001/users/logout', { mode: 'cors', credentials: 'include'})
  .then(() => { window.location.reload(); })
  .catch((error) => { console.log(`Log out error: ${error}`)})
}

  return (
    <div className="App">
      <header className="App-header" >
        <h1> Paper Trader</h1>
        {loggedIn ? <div id='logout'>Welcome, {(typeof(loggedInAs) !== 'undefined') ? loggedInAs : null }   
        <a onClick={logOut}>Logout</a></div> : <div id='logout'>Please log in below.</div>}

      </header>
      {loggedIn ? <GandS /> : <Login setAppState={setAppState} />}
      {loggedIn ? <Portfolio /> : null}
    </div>
  );
}

export default App;
