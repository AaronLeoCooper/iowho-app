import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../store/redux/IOweWidget'
import IOweSwitcher from '../components/IOweSwitcher'
import StyledInput from '../components/StyledInput'
import StyledSelect from '../components/StyledSelect'

class IOweWidgetContainer extends Component {
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.createOwe()
    }
  }

  render () {
    const currencySelect = (
      <StyledSelect
        name='iowidget-currency-select'
        className='iowewidgetcontainer-styledinput-currency-button'
        selectedValue={this.props.currency}
        items={this.props.currenciesList}
        onChange={this.props.setIOweCurrency} />
    )

    const submitButton = (
      <button
        className='iowewidgetcontainer-styledinput-submit-button'
        onClick={this.props.createOwe}
        tabIndex='3'>
        <img className='iowewidgetcontainer-styledinput-arrow' src={`${process.env.ASSETS}/images/arrow.svg`} />
      </button>
    )

    console.log('this.props.ErrorState', this.props.ErrorState)

    const errorMsg = this.props.ErrorState.hasError && this.props.ErrorState.key === 'amount'
      ? this.props.ErrorState.message
      : ''

    return (
      <div className='IOweWidgetContainer'>
        <IOweSwitcher {...this.props} />
        <StyledInput
          className='iowewidgetcontainer-styledinput'
          left={{ label: currencySelect }}
          right={{ label: submitButton }}
          onChange={this.props.setIOweAmount}
          onKeyPress={this.onKeyPress}
          value={this.props.amount}
          errorMsg={errorMsg}
          tabIndex='2' />
      </div>
    )
  }
}

IOweWidgetContainer.propTypes = {
  iOweThem: PropTypes.bool,
  name: PropTypes.string,
  amount: PropTypes.string,
  currenciesList: PropTypes.array,
  currencyKey: PropTypes.number,
  currency: PropTypes.string,
  toggleIoOrder: PropTypes.func,
  setIOweName: PropTypes.func,
  setIOweAmount: PropTypes.func,
  setIOweCurrency: PropTypes.func,
  createOwe: PropTypes.func,
  ErrorState: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.IOweWidget,
    currency: actionCreators.getCurrency(state.IOweWidget),
    ErrorState: state.ErrorState
  }
}

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(IOweWidgetContainer)
