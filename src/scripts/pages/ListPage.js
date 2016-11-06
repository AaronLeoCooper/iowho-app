import React, { Component, PropTypes } from 'react'

import Page from './Page'

class ListPage extends Component {
  render () {
    return (
      <Page pageTitle='List'>
        <h1>List</h1>
      </Page>
    )
  }
}

ListPage.propTypes = {}

ListPage.defaultProps = {}

export default ListPage
