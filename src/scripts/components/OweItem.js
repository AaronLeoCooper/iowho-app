import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class OweItem extends Component {
  removeOwe = (e) => {
    this.props.removeOwe(e.target.value)
  }

  render () {
    let content = this.props.iOweThem
      ? [ 'I owe', this.props.name, this.props.currency + this.props.amount ]
      : [ this.props.name, 'owes me', this.props.currency + this.props.amount ]

    content = content.map((item, index) => {
      return (
        <span
          className='oweitem-content-segment'
          key={`oweitem-${this.props.id}-segment-${index}`}>
          {item}
        </span>
      )
    })

    const classes = classnames('OweItem', this.props.className)

    return (
      <div className={classes}>
        <div className='oweitem-content'>
          {content}
        </div>
        <div className='oweitem-ctas'>
          <button
            className='oweitem-ctas-remove'
            onClick={this.removeOwe}
            value={this.props.id}>
            <img className='oweitem-ctas-remove-icon' src={`${process.env.ASSETS}/images/check.svg`} />
          </button>
        </div>
      </div>
    )
  }
}

OweItem.propTypes = {
  id: PropTypes.number,
  className: PropTypes.string,
  iOweThem: PropTypes.bool,
  name: PropTypes.string,
  amount: PropTypes.string,
  currency: PropTypes.string,
  removeOwe: PropTypes.func
}

export default OweItem
