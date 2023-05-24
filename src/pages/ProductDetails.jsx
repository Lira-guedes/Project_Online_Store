import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const api = await getProductById(id);
    console.log(api, id);
    this.setState({ product: api });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h1 data-testid="product-detail-name">{product.title}</h1>
        <img data-testid="product-detail-image" src={ product.thumbnail } alt="" />
        <p data-testid="product-detail-price">{product.price}</p>
        <Link to="/Cart">
          <button data-testid="shopping-cart-button">ir para o carrinho</button>
        </Link>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape().isRequired,
};
