import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductById } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    product: {},
    cart: [],
    email: '',
    opiniao: '',
    rate: '',
    selectRate: '',
    isValidInputs: true,
    avaliations: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const api = await getProductById(id);
    this.setState({ product: api });
    // Resgata o cart do local storage e salva no state
    const cart = JSON.parse(localStorage.getItem('cart'));
    const avaliations = JSON.parse(localStorage.getItem(api.id));
    this.setState({
      cart,
      avaliations,
    });
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

  handleAvaliation = ({ target }) => {
    const { name, value, type } = target;
    if (type === 'radio') {
      this.setState({ selectRate: value });
    }
    this.setState({ [name]: value });
  };

  changeIsValidInputs = () => {
    const { email, rate } = this.state;
    if (rate && email.includes('@') && email[email.length - 1] !== '@') {
      this.setState({ isValidInputs: true });
      return true;
    }
    this.setState({ isValidInputs: false });

    return false;
  };

  saveAvaliation = (event) => {
    event.preventDefault();
    const { email, opiniao, rate, product } = this.state;
    const avaliations = JSON.parse(localStorage.getItem(product.id));
    const retorno = this.changeIsValidInputs();
    let newAvaliations;
    if (retorno) {
      if (avaliations) {
        newAvaliations = [...avaliations, {
          email,
          rate,
          opiniao,
        }];
      } else {
        newAvaliations = [{
          email,
          rate,
          opiniao,
        }];
      }
      this.setState({ avaliations: newAvaliations });
      localStorage.setItem(`${product.id}`, JSON.stringify(newAvaliations));
      this.setState({
        email: '',
        selectRate: '',
        opiniao: '',
      });
    }
  };

  render() {
    const {
      product, selectRate, isValidInputs, avaliations, email, opiniao } = this.state;
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

          <form name="meu_form">

            <label htmlFor="email">Email:</label>
            <input
              data-testid="product-detail-email"
              type="email"
              required="required"
              name="email"
              value={ email }
              onChange={ this.handleAvaliation }
            />

            <label>
              <input
                data-testid="1-rating"
                type="radio"
                value="1"
                name="rate"
                checked={ selectRate === '1' }
                onChange={ this.handleAvaliation }
              />
              1
            </label>

            <label>
              <input
                required
                data-testid="2-rating"
                type="radio"
                value="2"
                name="rate"
                checked={ selectRate === '2' }
                onChange={ this.handleAvaliation }
              />
              2
            </label>

            <label>
              <input
                data-testid="3-rating"
                type="radio"
                value="3"
                name="rate"
                checked={ selectRate === '3' }
                onChange={ this.handleAvaliation }
              />
              3
            </label>

            <label>
              <input
                data-testid="4-rating"
                type="radio"
                value="4"
                name="rate"
                checked={ selectRate === '4' }
                onChange={ this.handleAvaliation }
              />
              4
            </label>

            <label>
              <input
                data-testid="5-rating"
                type="radio"
                value="5"
                name="rate"
                checked={ selectRate === '5' }
                onChange={ this.handleAvaliation }
              />
              5
            </label>

            <textarea
              value={ opiniao }
              name="opiniao"
              placeholder="Deixe sua opnião"
              data-testid="product-detail-evaluation"
              onChange={ this.handleAvaliation }

            />

            <button
              type="submit"
              className="enviar"
              value="Enviar"
              data-testid="submit-review-btn"
              /* disabled={ !isValidInputs } */
              onClick={ this.saveAvaliation }
            >
              Enviar
            </button>

          </form>
          {(!isValidInputs) && (
            <p data-testid="error-msg">Campos inválidos</p>
          )}
          <div>
            {!avaliations ? (
              <p>Nenhuma avaliação disponível.</p>
            ) : (
              avaliations.map((avaliation, index) => (
                <li key={ index }>
                  <strong data-testid="review-card-email">Email:</strong>
                  {avaliation.email}
                  <br />
                  <strong data-testid="review-card-rating">Nota:</strong>
                  {avaliation.rate}
                  <strong data-testid="review-card-evaluation">Comentário:</strong>
                  {avaliation.opiniao}
                  <br />
                </li>
              ))
            )}
          </div>
          <div className="" />
        </div>
      </>
    );
  }
}

ProductDetails.propTypes = { match: PropTypes.shape().isRequired };
