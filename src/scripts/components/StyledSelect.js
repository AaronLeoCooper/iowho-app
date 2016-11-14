import React, { Component, PropTypes } from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'

class StyledSelect extends Component {
  constructor (props) {
    super(props)

    this.state = { isOpen: false }

    this.dropdownTransition = {
      enter: { animation: 'fadeIn', duration: 250 },
      leave: { animation: 'fadeOut', duration: 250 }
    }
  }

  toggleOpen = (bool) => {
    if (typeof bool === 'boolean') {
      this.setState({ isOpen: false })
    } else {
      this.setState({ isOpen: !this.state.isOpen })
    }
  }

  onChange = (e) => {
    this.toggleOpen()
    this.props.onChange(parseInt(e.target.value))
  }

  handleClickOutside = () => {
    this.toggleOpen(false)
  }

  render () {
    const items = this.props.items.map((item, index) => {
      let itemClasses = classnames('styledselect-item', { 'active': item === this.props.selectedValue })
      return (
        <button
          key={`styledselect-${this.props.name}-item-${index}`}
          className={itemClasses}
          value={index}
          onClick={this.onChange}>{item}</button>
      )
    })

    const itemsClasses = classnames('styledselect-items', { 'is-open': this.state.isOpen })

    const itemsWrap = this.state.isOpen
      ? <div key='styledselect-items-${this.props.name}' className={itemsClasses}>{items}</div>
      : null

    return (
      <div className='StyledSelect' style={{ zIndex: this.props.zIndex }}>
        <button
          className='styledselect-button'
          value={this.props.selectedValue}
          onClick={this.toggleOpen}>{this.props.selectedValue}</button>
        <ReactCSSTransitionGroup
          transitionName='styledselect-items-animation'
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          {itemsWrap}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

StyledSelect.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  items: PropTypes.array,
  zIndex: PropTypes.string,
  onChange: PropTypes.func
}

StyledSelect.defaultProps = {
  name: '',
  className: '',
  placeholder: '',
  selectedValue: '',
  items: [],
  zIndex: '',
  onChange: () => null
}

export default enhanceWithClickOutside(StyledSelect)
