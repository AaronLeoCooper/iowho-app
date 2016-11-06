import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'

class App extends Component {
  render () {
    return (
      <div>
        <Helmet
          titleTemplate='%sIOWho?'
          defaultTitle='Simple Money Lendings Tracker'
        />
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

App.defaultProps = {
  children: PropTypes.element
}

export default App
