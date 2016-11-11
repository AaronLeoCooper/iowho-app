import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as actionCreators from '../store/redux/IOweWidget'
import * as paths from '../routes'
import Page from './Page'
import OweItem from '../components/OweItem'

class ListPage extends Component {
  render () {
    const owes = this.props.owes.map(owe => {
      return <OweItem key={`oweitem-${owe.id}`} removeOwe={this.props.removeOwe} {...owe} />
    })

    const content = owes.length > 0
      ? (
        <div className='listpage-owelist'>
          {owes}
        </div>
      )
      : <div className='listpage-owelist-emptymsg'>Grats, you have no owes!</div>

    return (
      <Page className='ListPage' title='Who Owes What?'>
        <h1>Who Owes What?</h1>
        <div className='listpage-content'>
          {content}
        </div>
        <Link to={paths.Index} className='cta cta-turquoise'>Add a new Owe</Link>
      </Page>
    )
  }
}

ListPage.propTypes = {
  owes: PropTypes.array,
  removeOwe: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.IOweWidget }
}

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(ListPage)
