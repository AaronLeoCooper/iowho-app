import React, { PropTypes } from 'React'

const IOweSwitcher = ({ defaultValue, onChange, onSwitch }) => {
  return (
    <div className='IOweSwitcher'>
      <span className='ioweswitcher-io'>i owe</span>
      <button onClick={onSwitch}></button>
      <input
        className='ioweswitcher-input'
        type='text'
        onChange={onChange}
        defaultValue={defaultValue} />
    </div>
  )
}

IOweSwitcher.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onSwitch: PropTypes.func
}

export default IOweSwitcher
