import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import classnames from 'classnames'

class Page extends Component {
  render () {
    let pageHeading = this.props.pageHeading
    if (!pageHeading) {
      pageHeading = this.props.pageTitle
    }

    let pageClasses = classnames('Page', this.props.className)

    return (
      <div className={pageClasses}>
        <Helmet title={`${this.props.pageTitle} - `} />
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
  pageHeading: PropTypes.node,
  pageDescription: PropTypes.string,
  className: PropTypes.string
}

Page.defaultProps = {
  children: null,
  pageTitle: '',
  pageHeading: '',
  pageDescription: '',
  className: ''
}

export default Page
