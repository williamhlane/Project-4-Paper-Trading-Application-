import './App.css';
import GandS from './componite/GandS';
import Portfolio from './componite/PortFolio';
function App() {
  return (
    <div className="App">
      <header className="App-header" >
         <h1> Paper Trader</h1>
          <div id='logout'>Welcome, William   <a  href=''>Logout</a></div>
          
      </header>
      <GandS />
      <Portfolio /> 
    </div>
  );
}

export default App;
