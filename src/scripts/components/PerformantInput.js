import React, { Component, PropTypes } from 'react'
import { debounce } from 'lodash'
import { noop } from '../helpers/misc'

class PerformantInput extends Component {
  constructor (props) {
    super(props)

    this.debouncedOnChange = debounce(this.debouncedOnChange, this.props.debounceDelay)
  }

  onChange = (e) => {
    this.debouncedOnChange(e.target.value)
  }

  debouncedOnChange = (value) => {
    this.props.onChange(value)
  }

  render () {
    return (
      <input
        className={this.props.className}
        type={this.props.type}
        onChange={this.onChange}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder} />
    )
  }
}

PerformantInput.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  debounceDelay: PropTypes.number
}

PerformantInput.defaultProps = {
  onChange: noop,
  className: '',
  type: '',
  defaultValue: '',
  placeholder: '',
  debounceDelay: 200
}

export default PerformantInput
