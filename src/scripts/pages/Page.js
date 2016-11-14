import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import classnames from 'classnames'
import { debounce } from 'lodash'

import { getWindowHeight, getElementHeight } from '../helpers/browser-dimensions'

class Page extends Component {
  constructor (props) {
    super(props)

    this.state = {
      footerPosition: 'fixed',
      windowHeight: getWindowHeight()
    }

    this.updateDimensions = debounce(this.updateDimensions, 300)
  }

  updateDimensions = () => {
    this.setState({
      windowHeight: getWindowHeight(),
      contentHeight: getElementHeight(this.state.contentEl)
    })
  }

  componentWillMount () {
    this.updateDimensions()
  }

  componentDidMount () {
    const contentEl = document.getElementsByClassName('Page')[0]

    this.setState({
      contentEl: contentEl,
      contentHeight: getElementHeight(contentEl)
    })

    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render () {
    const pageTitle = this.props.title
      ? `${this.props.title} - `
      : null

    const pageClasses = classnames(
      'Page',
      this.props.title ? `${this.props.title.replace(/\W/g, '')}Page` : '',
      this.props.className
    )

    const meta = [
      { name: 'description', content: this.props.description }
    ]

    const footerClasses = classnames(
      'footer',
      { 'pos-absolute': this.state.contentHeight > this.state.windowHeight }
    )

    return (
      <div className={pageClasses}>
        <Helmet title={pageTitle} meta={meta} />
        <div className='page-content wrap'>
          {this.props.children}
        </div>
        <div className={footerClasses}>
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
