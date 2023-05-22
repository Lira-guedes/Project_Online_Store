import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class productList extends Component {
  render() {
    return (
      <>
        <label htmlFor="">
          <input type="text" />
        </label>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>

      </>
    );
  }
}
