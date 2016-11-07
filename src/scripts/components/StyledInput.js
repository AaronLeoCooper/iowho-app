import React, { PropTypes } from 'react'

function StyledInput ({ left, right }) {
  const leftEl = <span className='styledinput-left'>{left.label}</span>

  return (
    <div className='StyledInput'>
      {leftEl}
      <input />
    </div>
  )
}

StyledInput.propTypes = {
  left: PropTypes.object,
  right: PropTypes.object
}

StyledInput.defaultProps = {
  left: {},
  right: {}
}

export default StyledInput
