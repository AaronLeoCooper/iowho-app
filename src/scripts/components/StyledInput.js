import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { noop } from '../helpers/misc'
import PerformantInput from './PerformantInput'

class StyledInput extends Component {
  render () {
    const leftEl = this.props.left.label
      ? <span className='styledinput-block styledinput-left'>{this.props.left.label}</span>
      : null

    const rightEl = this.props.right.label
      ? <span className='styledinput-block styledinput-right'>{this.props.right.label}</span>
      : null

    const inputClasses = classnames(
      'styledinput-input',
      { 'has-left-block': !!this.props.left.label },
      { 'has-right-block': !!this.props.right.label }
    )

    const wrapperClasses = classnames('StyledInput', this.props.className)

    return (
      <div className={wrapperClasses}>
        {leftEl}
        <PerformantInput
          className={inputClasses}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          defaultValue={this.props.defaultValue} />
        {rightEl}
      </div>
    )
  }
}

StyledInput.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  left: PropTypes.object,
  right: PropTypes.object,
  onChange: PropTypes.func
}

StyledInput.defaultProps = {
  placeholder: '',
  className: '',
  defaultValue: '',
  left: {},
  right: {},
  onChange: noop
}

export default StyledInput
