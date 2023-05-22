import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import productList from './pages/productList';
// subindo codigo da branch lira

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload. Teste</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        

      </header>
      <>
        <Switch>
          <Route path="/" component={ productList } exact />
        </Switch>
      </>
    </div>
  );
}

export default App;
