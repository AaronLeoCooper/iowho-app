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
      this.props.title ? `${this.props.title.replace(/\W/g, '')}Page` : '',
      this.props.className
    )

    let meta = [
      { name: 'description', content: this.props.description }
    ]

    return (
      <div className={pageClasses}>
        <Helmet title={pageTitle} meta={meta} />
        <div className='page-content wrap'>
          {this.props.children}
        </div>
        <div className='footer'>
          <div className='footer-msg'>
            Created with <em>❤</em> by <a href='http://www.alcooper.me'>Aaron Leo Cooper</a>
          </div>
        </div>
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
