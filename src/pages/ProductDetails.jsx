import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    product: {},
    cart: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const api = await getProductById(id);
    console.log(api, id);
    this.setState({ product: api });

    // Resgata o cart do local storage e salva no state
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  }

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
    const { product } = this.state;
    return (
      <>
        <div>
          <Link to="/Cart">
            <button data-testid="shopping-cart-button">ir para o carrinho</button>
          </Link>
        </div>
        <div>
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <img data-testid="product-detail-image" src={ product.thumbnail } alt="" />
          <p data-testid="product-detail-price">{product.price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addProductCart(product) }
          >
            Adicionar ao Carrinho
          </button>

        </div>
      </>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
