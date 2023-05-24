import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategory,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import cartLogo from '../images/cartLogo.png';

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

    // Resgata o cart do local storage e salva no state
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
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

    // verifica se o produto ja existe no cart e atualiza quantidade!
    let newCart = [];
    if (cart) {
      if (cart.some((product) => product.id === elem.id)) {
        cart.forEach((product) => {
          if (product.id === elem.id) {
            product.quantity += 1;
          }
          newCart.push(product);
        });
      } else {
        elem.quantity = 1;
        newCart = [...cart, elem];
      }
    } else {
      elem.quantity = 1;
      newCart = [elem];
    }

    // salva o cart atualizado
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ cart: newCart });
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
      <div className="mainContainer">

        <div className="categoriesContainer">
          {
            list
          }
        </div>

        <section className="asideContainer">
          <div className="asideContainerTopSubContainer">
            <div className="searchField">
              <input
                type="text"
                data-testid="query-input"
                name="name"
                onChange={ this.saveName }
              />

              <button
                data-testid="query-button"
                onClick={ this.handleSearch }
              >
                Pesquisar
              </button>
            </div>
            <Link
              to="/cart"
              data-testid="shopping-cart-button"
              className="cartButton"
            >
              <img src={ cartLogo } alt="logo do cart" />
            </Link>
          </div>
          {
          // retorna requisição da api feita na barra de pesquisa
            apiRequest && apiRequest.length > 0 && (
              <div>
                <h2>
                  Resultado:
                  {' '}
                  {savedName}
                </h2>
                <ul className="products">
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
                          <h4>{ elem.title }</h4>
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

          {(!inputName) ? (
          // retorna requisição da api feita na barra de pesquisa
            apiCategory && apiCategory.length > 0 && (
              <div>
                <ul className="products">
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
                          <h4>{ elem.title }</h4>
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
                        </button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          ) : ('')}
        </section>
      </div>
    );
  }
}
