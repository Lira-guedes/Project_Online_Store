import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromQuery } from '../services/api';

export default class productList extends Component {
  state = {
    productCategory: [],
    apiRequest: false,
    name: '',
  };

  async componentDidMount() {
    const productCategory = await getCategories();
    this.setState({ productCategory });
  }

  saveName = ({ target }) => {
    const { value } = target;
    this.setState(() => ({
      name: value,
      savedName: value,
    }));
  };

  // faz busca
  handleSearch = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    console.log(name);
    // requisição api
    const api = await getProductsFromQuery(name);
    this.setState({
      apiRequest: api,
    });
  };

  render() {
    const { productCategory, apiRequest, savedName } = this.state;
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
          <input
            type="text"
            data-testid="query-input"
            name="name"
            // value={ savedName }
            onChange={ this.saveName }
          />
        </label>
        <button
          data-testid="query-button"
          onClick={ this.handleSearch }
        >
          Pesquisar
        </button>
        {
          apiRequest && apiRequest.length > 0 && (
            <div>
              <h2>
                Resultado:
                {' '}
                {savedName}
              </h2>
              <ul>
                {
                  apiRequest.map((elem) => (
                    <li key={ elem.id } data-testid="product">
                      <img src={ elem.thumbnail } alt={ elem.title } />
                      <h3>{ elem.title }</h3>
                      <p>
                        { elem.price }
                        $
                      </p>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
        {
          apiRequest.length === 0 && (<p>Nenhum produto foi encontrado</p>)
        }

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
