import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../store/redux/IOweWidget'
import IOweSwitcher from '../components/IOweSwitcher'
import StyledInput from '../components/StyledInput'

class IOweWidgetContainer extends Component {


  render () {
    return (
      <div className='IOweWidgetContainer'>
        <IOweSwitcher {...this.props} />
        <StyledInput
          className='iowewidgetcontainer-styledinput'
          left={{ label: (
            <span className='iowewidgetcontainer-styledinput-'>
              {this.props.currency}
            </span>
          )}}
          right={{ label: (
            <button className='iowewidgetcontainer-styledinput-button'>
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
  currency: PropTypes.string,
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
