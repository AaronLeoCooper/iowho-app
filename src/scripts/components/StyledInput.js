import React, { PropTypes } from 'react'
import classnames from 'classnames'

function StyledInput ({ placeholder, className, defaultValue, left, right, onChange }) {
  const leftEl = left.label
    ? <span className='styledinput-block styledinput-left'>{left.label}</span>
    : null

  const rightEl = right.label
    ? <span className='styledinput-block styledinput-right'>{right.label}</span>
    : null

  const inputClasses = classnames(
    'styledinput-input',
    { 'has-left-block': !!left.label },
    { 'has-right-block': !!right.label }
  )

  const wrapperClasses = classnames('StyledInput', className)

  return (
    <div className={wrapperClasses}>
      {leftEl}
      <input className={inputClasses} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue} />
      {rightEl}
    </div>
  )
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
  onChange: () => null
}

export default StyledInput
