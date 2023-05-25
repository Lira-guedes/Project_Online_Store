import { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart }/* , () => this.quantityProducts() */);
  }

  // atualiza quantidade!
  handleIncrease = (elem) => {
    const { cart } = this.state;
    const newCart = [];
    cart.forEach((product) => {
      if (product.id === elem.id) {
        product.quantity += 1;
      }
      newCart.push(product);
    });
    // salva o cart atualizado
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ cart: newCart });
  };

  // atualiza quantidade!
  handleDecrease = (elem) => {
    const newCart = [];
    const { cart } = this.state;
    if (elem.quantity > 1) {
      cart.forEach((product) => {
        if (product.id === elem.id) {
          product.quantity -= 1;
        }
        newCart.push(product);
      });
      // salva o cart atualizado
      localStorage.setItem('cart', JSON.stringify(newCart));
      this.setState({ cart: newCart });
    }
  };

  handleDelete = (elem) => {
    const newCart = [];
    const { cart } = this.state;
    cart.forEach((product) => {
      if (product.id !== elem.id) {
        newCart.push(product);
      }
    });
    // salva o cart atualizado
    localStorage.setItem('cart', JSON.stringify(newCart));
    this.setState({ cart: newCart });
  };

  render() {
    const { cart } = this.state;
    let listProducts;

    if (cart) {
      listProducts = cart.map((product) => (
        <li
          key={ product.id }
          className="productCard"
        >
          <img src={ product.thumbnail } alt={ product.title } />
          <h3 data-testid="shopping-cart-product-name">{ product.title }</h3>
          <p>
            { product.price }
            $
          </p>
          <p data-testid="shopping-cart-product-quantity">
            {`Quantidade: ${product.quantity}`}
          </p>
          <div className="botoesMaisMenos">
            <button
              data-testid="product-increase-quantity"
              onClick={ () => this.handleIncrease(product) }
            >
              +
            </button>
            <button
              data-testid="product-decrease-quantity"
              onClick={ () => this.handleDecrease(product) }
            >
              -
            </button>
          </div>
          <button
            data-testid="remove-product"
            onClick={ () => this.handleDelete(product) }
          >
            Delete
          </button>
        </li>
      ));
    }

    return (
      <>
        <div className="headerDetails">
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </div>
        <div className="products">
          {(cart) && (
            listProducts
          ) }

          {(listProducts.length === 0) && (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)}
          <Link
            to="/Checkout"
            data-testid="checkout-products"
          >
            Finalizar compra

          </Link>
        </div>
      </>
    );
  }
}
