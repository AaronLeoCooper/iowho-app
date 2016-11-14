import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import PerformantInput from '../components/PerformantInput'
import { noop } from '../helpers/misc'
import * as actionCreators from '../store/redux/IOweWidget'

class IOweSwitcherContainer extends Component {
  setIOweName = (val) => {
    this.props.setIOweName(val)
  }

  render () {
    const errorEl = this.props.ErrorState.hasError && this.props.ErrorState.key === 'name'
      ? <span className='error-msg iowswitcher-input-error'>{this.props.ErrorState.message}</span>
      : null

    return (
      <div className={classnames('IOweSwitcherContainer', { 'iowethem': this.props.iOweThem })}>
        <span className='ioweswitcher-text-iowe'>{ this.props.iOweThem ? 'i owe' : 'owes me' }</span>
        <PerformantInput
          className='ioweswitcher-text-input'
          type='text'
          onChange={this.props.setIOweName}
          value={this.props.name}
          placeholder='who?'
          tabIndex='1' />
        {errorEl}
        <button className='ioweswitcher-button' onClick={this.props.toggleIoOrder} />
      </div>
    )
  }
}

IOweSwitcherContainer.propTypes = {
  name: PropTypes.string,
  iOweThem: PropTypes.bool,
  ErrorState: PropTypes.object,
  setIOweName: PropTypes.func,
  toggleIoOrder: PropTypes.func
}

IOweSwitcherContainer.defaultProps = {
  name: '',
  iOweThem: true,
  ErrorState: {},
  setIOweName: noop,
  toggleIoOrder: noop
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.IOweWidget,
    ErrorState: state.ErrorState
  }
}

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(IOweSwitcherContainer)
