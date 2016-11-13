import React, { Component, PropTypes } from 'react'
import { debounce } from 'lodash'
import { noop } from '../helpers/misc'

class PerformantInput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value
    }

    this.debouncedOnChange = debounce(this.debouncedOnChange, this.props.debounceDelay)
  }

  componentWillReceiveProps (nextProps) {
    // Update the input state value if the next prop value is different
    if (nextProps.value !== this.state.value) this.setState({ value: nextProps.value })
  }

  onChange = (e) => {
    this.setState(
      { value: e.target.value },
      this.debouncedOnChange(e.target.value)
    )
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
        value={this.state.value}
        placeholder={this.props.placeholder} />
    )
  }
}

PerformantInput.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  debounceDelay: PropTypes.number
}

PerformantInput.defaultProps = {
  onChange: noop,
  className: '',
  type: '',
  value: '',
  defaultValue: '',
  placeholder: '',
  debounceDelay: 200
}

export default PerformantInput
