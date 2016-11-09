import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class StyledSelect extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onChange = (e) => {
    this.toggleOpen()
    this.props.onChange(parseInt(e.target.value))
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

    let itemsClasses = classnames('styledselect-items', { 'is-open': this.state.isOpen })

    return (
      <div className='StyledSelect'>
        <button
          className='styledselect-button'
          value={this.props.selectedValue}
          onClick={this.toggleOpen}>{this.props.selectedValue}</button>
        <div className={itemsClasses}>{items}</div>
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
  onChange: PropTypes.func
}

StyledSelect.defaultProps = {
  name: '',
  className: '',
  placeholder: '',
  selectedValue: '',
  items: [],
  onChange: () => null
}

export default StyledSelect
