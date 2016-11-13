import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import PerformantInput from './PerformantInput'

class IOweSwitcher extends Component {
  setIOweName = (val) => {
    this.props.setIOweName(val)
  }

  render () {
    const errorEl = this.props.error.hasError && this.props.error.key === 'name'
      ? <span className='error-msg iowswitcher-input-error'>{this.props.error.message}</span>
      : null

    return (
      <div className={classnames('IOweSwitcher', { 'iowethem': this.props.iOweThem })}>
        <span className='ioweswitcher-text-iowe'>{ this.props.iOweThem ? 'i owe' : 'owes me' }</span>
        <PerformantInput
          className='ioweswitcher-text-input'
          type='text'
          onChange={this.props.setIOweName}
          value={this.props.name}
          placeholder='who?' />
        {errorEl}
        <button className='ioweswitcher-button' onClick={this.props.toggleIoOrder} />
      </div>
    )
  }
}

IOweSwitcher.propTypes = {
  name: PropTypes.string,
  iOweThem: PropTypes.bool,
  error: PropTypes.object,
  setIOweName: PropTypes.func,
  toggleIoOrder: PropTypes.func
}

export default IOweSwitcher
