import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { removeOwe } from '../store/redux/OwesState'
import OweItem from '../components/OweItem'

class OweListContainer extends Component {
  render () {
    if (this.props.owes.length === 0) return null

    const owes = this.props.owes.map(owe => {
      return <OweItem key={`oweitem-${owe.id}`} removeOwe={this.props.removeOwe} {...owe} />
    })

    return (
      <div className='OweListContainer'>
        <div className='owelist-content'>
          {owes}
        </div>
      </div>
    )
  }
}

OweListContainer.propTypes = {
  owes: PropTypes.array,
  removeOwe: PropTypes.func
}

OweListContainer.defaultProps = {
  owes: []
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.OwesState }
}

export default connect(
  mapStateToProps,
  { removeOwe }
)(OweListContainer)
