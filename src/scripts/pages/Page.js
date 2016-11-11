import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import classnames from 'classnames'

class Page extends Component {
  render () {
    let pageTitle = this.props.title
      ? `${this.props.title} - `
      : null

    let pageClasses = classnames(
      'Page',
      this.props.title ? `${this.props.title.split(' ').join('')}Page` : '',
      this.props.className
    )

    let meta = [
      { name: 'description', content: this.props.description }
    ]

    return (
      <div className={pageClasses}>
        <Helmet title={pageTitle} meta={meta} />
        {this.props.children}
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string
}

Page.defaultProps = {
  children: null,
  title: '',
  description: 'The blissfully simple money lending tracker',
  className: ''
}

export default Page
