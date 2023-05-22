import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class productList extends Component {

  render() {
    return (
      <>
        <label htmlFor="">
        <input type="text" />
        </label>
        <p data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</p>
      </>
    )
  }
}
