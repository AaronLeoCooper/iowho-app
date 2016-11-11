import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import { noop } from '../helpers/misc'

function ContextualButton ({ className, to, children, badge, value, onClick }) {
  const badgeEl = badge.label
    ? <div className='contextualbutton-badge'><span>{badge.label}</span></div>
    : null

  const buttonClasses = classnames('ContextualButton', className)

  if (to) {
    return (
      <Link
        className={buttonClasses}
        to={to}
        onClick={onClick}
        value={value}>
        {children}
        {badgeEl}
      </Link>
    )
  } else {
    return (
      <button
        className={buttonClasses}
        onClick={onClick}
        value={value}>
        {children}
        {badgeEl}
      </button>
    )
  }
}

ContextualButton.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node,
  badge: PropTypes.object,
  value: PropTypes.string,
  onClick: PropTypes.func
}

ContextualButton.defaultProps = {
  className: '',
  to: '',
  children: '',
  badge: {},
  value: '',
  onClick: noop
}

export default ContextualButton
