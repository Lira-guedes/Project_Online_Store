import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class productList extends Component {
  constructor() {
    super();

    this.state = {
      productCategory: [],
    };
  }

  async componentDidMount() {
    const productCategory = await getCategories();
    this.setState({ productCategory });
  }

  render() {
    const { productCategory } = this.state;
    console.log(productCategory);
    const list = productCategory.map(({ id, name }) => (

      <li
        data-testid="category"
        key={ id }
      >
        <a
          href="test"
        >
          {name}

        </a>
      </li>
    ));
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

        {list}
      </>
    );
  }
}
