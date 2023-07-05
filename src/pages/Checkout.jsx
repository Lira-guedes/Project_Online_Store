import { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default class Checkout extends Component {
  state = {
    cart: [],
    selectedPayment: '',
    fullName: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    cep: '',
    address: '',
    isValidInputs: true,
    finish: false,
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ cart });
  }

  handleAvaliation = ({ target }) => {
    const { name, value, type } = target;
    if (type === 'radio') {
      this.setState({ selectedPayment: value });
    }
    this.setState({ [name]: value });
  };

  changeIsValidInputs = () => {
    const {
      selectedPayment,
      fullName,
      email,
      cpf,
      phoneNumber,
      cep,
      address,
    } = this.state;

    const emailValid = email.includes('@') && email[email.length - 1] !== '@';
    if (
      fullName && cpf && phoneNumber && cep && address && emailValid && selectedPayment) {
      this.setState({ isValidInputs: true });

      return true;
    }
    this.setState({ isValidInputs: false });

    return false;
  };

  completedPurchase = (event) => {
    event.preventDefault();
    const result = this.changeIsValidInputs();
    if (result) {
      localStorage.clear();
      this.setState({ finish: true });
    }
  };

  render() {
    const { cart, selectedPayment, isValidInputs, finish } = this.state;
    return (
      <div>
        {cart.map((product) => (
          <li
            key={ product.id }
            className="productCard"
          >
            <img src={ product.thumbnail } alt={ product.title } />
            <h3>{ product.title }</h3>
            <p>
              { product.price }
              $
            </p>
          </li>))}
        <form>
          <label
            htmlFor="fullName"
          >
            Nome Completo

          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            data-testid="checkout-fullname"
            required
            onChange={ this.handleAvaliation }
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            data-testid="checkout-email"
            required
            onChange={ this.handleAvaliation }
          />

          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            data-testid="checkout-cpf"
            required
            onChange={ this.handleAvaliation }
          />

          <label htmlFor="foneNumber">Telefone</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            data-testid="checkout-phone"
            required
            onChange={ this.handleAvaliation }
          />

          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            name="cep"
            data-testid="checkout-cep"
            required
            onChange={ this.handleAvaliation }
          />

          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            data-testid="checkout-address"
            required
            onChange={ this.handleAvaliation }
          />

          <label htmlFor="payment">Método de pagamento</label>
          <input
            type="radio"
            id="payment"
            name="payment"
            value="Boleto"
            data-testid="ticket-payment"
            checked={ selectedPayment === 'Boleto' }
            onChange={ this.handleAvaliation }
          />
          Boleto
          <br />
          <input
            type="radio"
            id="payment"
            name="payment"
            value="Visa"
            data-testid="visa-payment"
            checked={ selectedPayment === 'Visa' }
            onChange={ this.handleAvaliation }
          />
          Visa
          <br />
          <input
            type="radio"
            id="payment"
            name="payment"
            value="MasterCard"
            data-testid="master-payment"
            checked={ selectedPayment === 'MasterCard' }
            onChange={ this.handleAvaliation }
          />
          MasterCard
          <br />
          <input
            type="radio"
            id="payment"
            name="payment"
            value="Elo"
            data-testid="elo-payment"
            checked={ selectedPayment === 'Elo' }
            onChange={ this.handleAvaliation }
          />
          Elo
          <br />
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.completedPurchase }
          >
            Finalizar

          </button>
        </form>

        {(!isValidInputs) && (
          <p data-testid="error-msg">Campos inválidos</p>
        )}

        {(finish) && <Redirect to="/" />}

      </div>
    );
  }
}
