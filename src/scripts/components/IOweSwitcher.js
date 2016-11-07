import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { debounce } from 'lodash'

class IOweSwitcher extends Component {
  constructor(props) {
    super(props)

    this.setIOweName = debounce(this.setIOweName, 200)
  }

  debounceOnChange = (e) => {
    this.setIOweName(e.target.value)
  }

  setIOweName = (val) => {
    this.props.setIOweName(val)
  }

  render () {
    return (
      <div className={classnames('IOweSwitcher', { 'iowethem': this.props.iOweThem })}>
        <span className='ioweswitcher-text-iowe'>{ this.props.iOweThem ? 'i owe' : 'owes me' }</span>
        <input
          className='ioweswitcher-text-input'
          type='text'
          onChange={this.debounceOnChange}
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
