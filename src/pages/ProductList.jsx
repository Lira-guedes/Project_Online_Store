import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategory,
} from '../services/api';

export default class productList extends Component {
  state = {
    productCategory: [],
    apiRequest: false,
    apiCategory: false,
    productName: '',
    selectedCategory: '',
  };

  // monta lista categorias
  async componentDidMount() {
    const productCategory = await getCategories();
    this.setState({ productCategory });
  }

  // mantém nome na barra de pesquisa
  saveName = ({ target }) => {
    const { value } = target;
    this.setState(() => ({
      productName: value,
      savedName: value,
    }));
  };

  // faz busca
  handleSearch = async (event) => {
    event.preventDefault();
    const { productName } = this.state;
    // requisição api
    const api = await getProductsFromQuery(productName);
    this.setState({
      apiRequest: api,
    });
  };

  handleSearchCategory = async ({ target }) => {
    const { value } = target;
    // requisição api
    const api = await getProductsFromCategory(value);
    console.log(api, value);
    this.setState({
      apiCategory: api,
      selectedCategory: value,
    });
  };

  render() {
    const {
      productCategory,
      apiCategory,
      apiRequest,
      savedName,
      productName,
      selectedCategory,
    } = this.state;
    console.log(productName);
    // renderiza lista
    const list = productCategory.map(({ id, name }) => (
      <label key={ id } data-testid="category">
        <input
          type="radio"
          value={ id }
          checked={ selectedCategory === id }
          onChange={ this.handleSearchCategory }
        />
        {name}
      </label>
    ));
    return (
      // barra de pesquisa e botão
      <>
        <label htmlFor="">
          <input
            type="text"
            data-testid="query-input"
            name="name"
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
          // retorna requisição da api feita na barra de pesquisa
          apiRequest && apiRequest.length > 0 && (
            <div>
              <h2>
                Resultado:
                {' '}
                {savedName}
              </h2>
              <ul>
                {
                  // cria um array com a descrição do produto pesquisado na api
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
          // retorna erro se produto não existir
          apiRequest.length === 0 && (<p>Nenhum produto foi encontrado</p>)
        }

        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </p>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>

        {
          list
        }

        {(!productName) ? (
          // retorna requisição da api feita na barra de pesquisa
          apiCategory && apiCategory.length > 0 && (
            <div>
              <ul>
                {
                  // cria um array com a descrição do produto pesquisado na api
                  apiCategory.map((elem) => (
                    <li key={ elem.id } data-testid="category">
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
        ) : ('')}
      </>
    );
  }
}
