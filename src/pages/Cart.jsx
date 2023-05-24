import { Component } from 'react';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart }/* , () => this.quantityProducts() */);
  }

  /*  quantityProducts = () => {
    const { cart } = this.state;
    const newCart = [];
    if (cart) {
      const quantity = cart.map((product) => {
        const id2 = product.id;
        return cart.filter(({ id }) => id === id2).length;
      });
      cart.forEach((product, index) => {
        const count = quantity[index];
        product.quantity = count;
        newCart.push(product);
      });
    }

    this.setState({ cart });
    // só falta filtrar o array cart
  }; */

  render() {
    const { cart } = this.state;
    console.log(cart);
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
          <p data-testid="shopping-cart-product-quantity">{product.quantity}</p>
        </li>
      ));
    }

    return (
      <div>
        {(cart) ? (
          listProducts
        ) : (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        )}

      </div>
    );
  }
}
