import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';

function App() {
  return (

    <Switch>
      <Route path="/" component={ ProductList } exact />
      <Route path="/Cart" component={ Cart } exact />
    </Switch>

  );
}

export default App;
