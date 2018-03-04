import React, { Component } from 'react';
import logo from './logo_lafourchette.png';
import './App.css';
import deals from './outputDeals.json';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Les meilleurs deals des restaurants étoilés de France</h1>
        </header>
        <ul>
        {
          deals.map(function(json){
            return <li>{json.title} : {json.deal}</li>;
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
