import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (

    <Switch>
      <Route path="/" component={ ProductList } exact />
      <Route path="/Cart" component={ Cart } exact />
      <Route path="/ProductDetails/:id" component={ ProductDetails } exact />
      <Route path="/Checkout" component={ Checkout } exact />
    </Switch>

  );
}

export default App;
