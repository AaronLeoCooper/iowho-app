import React, { Component, PropTypes } from 'react'

import Page from './Page'

class AboutPage extends Component {
  render () {
    return (
      <Page pageTitle='About'>
        <h1>About</h1>
      </Page>
    )
  }
}

AboutPage.propTypes = {}

AboutPage.defaultProps = {}

export default AboutPage
