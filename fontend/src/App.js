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
//NEED TO BE ABLE TO RESET USERS
//NEED TO GRAPH STOCKS OWNED
//NEED TO BUY AND SELL STOCKS
//DELETE COOKIE IS NOT WORKING
////////////////////////////////////////////////////////////
let loggedIn = 0;
let loggedInAs;
let stocksObject;
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["connect.sid"]);//Delete cookie is not working on logout
  const [appState, setAppState] = useState();//appState is an object that store the logged authenticate and username.
  if ( (typeof (appState) !== 'undefined') && (appState !== null)) {
    loggedIn = (appState.authenticated === "true");
    loggedInAs = appState.username;
    //stocksObject = appState.stocks;
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
        if(res.results === "DONE"){
          window.location.reload();
        }
        alert(res.results);
    }).catch((error) =>{
      console.log(error);
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
        if(res.results === "DONE"){
          logOut();
        }
        alert(res.results);
    }).catch((error) =>{
      console.log(error);
    });
}

  return (
    <div className="App">
      <header className="App-header" >
        <h1> Paper Trader</h1>
        {loggedIn ? <div id='logout'>Welcome, {(typeof(loggedInAs) !== 'undefined') ? loggedInAs : null }  <button onClick={logOut}> Logout </button></div> : <div id='logout'>Please log in below.</div>}
        {loggedIn ? <button onClick={restUser}> Reset User {loggedIn} </button> : null }
        {loggedIn ? <button onClick={deleteUser}> Delete User {loggedIn} </button> : null }
      </header>
      {loggedIn ? <GandS /> : <Login setAppState={setAppState} />}
      {loggedIn ? <Portfolio /> : null}
    </div>
  );
}

export default App;
