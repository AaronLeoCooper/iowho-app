import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { getOwesCount } from '../store/redux/OwesState'
import * as paths from '../routes'
import Page from './Page'
import OweListContainer from '../containers/OweListContainer'
import IOweWidgetContainer from '../containers/IOweWidgetContainer'
import ContextualButton from '../components/ContextualButton'

class HomePage extends Component {
  render () {
    return (
      <Page className='HomePage'>
        <h1 className='homepage-logo'>
          <img className='homepage-logo-img' src={`${process.env.ASSETS}/images/iowho-logo.svg`} alt='IOWho Logo' />
          <span className='homepage-logo-text'>The blissfully simple money lending tracker</span>
        </h1>
        <OweListContainer />
        <IOweWidgetContainer />
      </Page>
    )
  }
}

HomePage.propTypes = {
  owesCount: PropTypes.number
}

HomePage.defaultProps = {
  owesCount: 0
}

const mapStateToProps = (state, ownProps) => {
  return {
    owesCount: getOwesCount(state.IOweWidget)
  }
}

export default connect(
  mapStateToProps
)(HomePage)
