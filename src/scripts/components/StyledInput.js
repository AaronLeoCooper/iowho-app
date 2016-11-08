import React, { PropTypes } from 'react'
import classnames from 'classnames'

function StyledInput ({ className, left, right }) {
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
      <input className={inputClasses} />
      {rightEl}
    </div>
  )
}

StyledInput.propTypes = {
  className: PropTypes.string,
  left: PropTypes.object,
  right: PropTypes.object
}

StyledInput.defaultProps = {
  className: '',
  left: {},
  right: {}
}

export default StyledInput
