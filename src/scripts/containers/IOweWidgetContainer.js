import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../store/redux/IOweWidget'
import IOweSwitcher from '../components/IOweSwitcher'
import StyledInput from '../components/StyledInput'
import StyledSelect from '../components/StyledSelect'

class IOweWidgetContainer extends Component {
  render () {
    return (
      <div className='IOweWidgetContainer'>
        <IOweSwitcher {...this.props} />
        <StyledInput
          className='iowewidgetcontainer-styledinput'
          left={{ label: (
            <StyledSelect
              name='iowidget-currency-select'
              className='iowewidgetcontainer-styledinput-currency-button'
              selectedValue={this.props.currenciesList[this.props.currencyKey]}
              items={this.props.currenciesList}
              onChange={this.props.setIOweCurrency} />
          )}}
          right={{ label: (
            <button className='iowewidgetcontainer-styledinput-submit-button'>
              <img className='iowewidgetcontainer-styledinput-arrow' src={`${process.env.ASSETS}/images/arrow.svg`} />
            </button>
          ) }} />
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
  toggleIoOrder: PropTypes.func,
  setIOweName: PropTypes.func,
  setIOweAmount: PropTypes.func,
  setIOweCurrency: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.IOweWidget }
}

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(IOweWidgetContainer)
