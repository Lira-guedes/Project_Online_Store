import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategory,
  getProductsFromCategoryAndQuery,
} from '../services/api';

export default class productList extends Component {
  state = {
    productCategory: [],
    apiRequest: false,
    apiCategory: false,
    inputName: '',
    selectedCategory: '',
    cart: [],
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
      inputName: value,
      savedName: value,
    }));
  };

  // faz busca
  handleSearch = async (event) => {
    event.preventDefault();
    const { inputName } = this.state;
    // requisição ap
    const api = await getProductsFromCategoryAndQuery('', inputName);
    /* const api = await getProductsFromQuery(inputName); */
    this.setState({
      apiRequest: api.results,
    });
  };

  handleSearchCategory = async ({ target }) => {
    const { value } = target;
    // requisição api
    const api = await getProductsFromCategory(value);
    this.setState({
      apiCategory: api,
      selectedCategory: value,
    });
  };

  addProductCart = (elem) => {
    const { cart } = this.state;
    console.log(elem);
    const findProduct = cart.find((elemento) => elem.id === elemento.id);
    if (findProduct.length > 0) {
      const newCart = [...cart];
      this.setState({
        cart: newCart,
      });
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  render() {
    const {
      productCategory,
      apiCategory,
      apiRequest,
      savedName,
      inputName,
      selectedCategory,
    } = this.state;
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
                    <li
                      key={ elem.id }
                      data-testid="product"
                      className="productCard"
                    >
                      {/* redireciona para a página ProductDetails */ }
                      <Link
                        to={ `/ProductDetails/${elem.id}` }
                        data-testid="product-detail-link"
                      >
                        <img src={ elem.thumbnail } alt={ elem.title } />
                        <h3>{ elem.title }</h3>
                        <p>
                          { elem.price }
                          $
                        </p>
                      </Link>
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                        onClick={ () => this.addProductCart(elem) }
                      >
                        Adicionar ao Carrinho
                        {' '}

                      </button>
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

        {(!inputName) ? (
          // retorna requisição da api feita na barra de pesquisa
          apiCategory && apiCategory.length > 0 && (
            <div>
              <ul>
                {
                  // cria um array com a descrição do produto pesquisado na api
                  apiCategory.map((elem) => (
                    <li
                      key={ elem.id }
                      data-testid="product"
                      className="productCard"
                    >
                      {/* redireciona para a página ProductDetails */ }
                      <Link
                        to={ `/ProductDetails/${elem.id}` }
                        data-testid="product-detail-link"
                      >
                        <img src={ elem.thumbnail } alt={ elem.title } />
                        <h3>{ elem.title }</h3>
                        <p>
                          { elem.price }
                          $
                        </p>
                      </Link>
                      <button
                        type="button"
                        data-testid="product-add-to-cart"
                      >
                        Adicionar ao Carrinho
                        {' '}

                      </button>
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
