import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import PerformantInput from './PerformantInput'

class IOweSwitcher extends Component {
  setIOweName = (val) => {
    this.props.setIOweName(val)
  }

  render () {
    return (
      <div className={classnames('IOweSwitcher', { 'iowethem': this.props.iOweThem })}>
        <span className='ioweswitcher-text-iowe'>{ this.props.iOweThem ? 'i owe' : 'owes me' }</span>
        <PerformantInput
          className='ioweswitcher-text-input'
          type='text'
          onChange={this.props.setIOweName}
          defaultValue={this.props.name}
          placeholder='who?' />
        <button className='ioweswitcher-button' onClick={this.props.toggleIoOrder} />
      </div>
    )
  }
}

IOweSwitcher.propTypes = {
  name: PropTypes.string,
  iOweThem: PropTypes.bool,
  setIOweName: PropTypes.func,
  toggleIoOrder: PropTypes.func
}

export default IOweSwitcher
