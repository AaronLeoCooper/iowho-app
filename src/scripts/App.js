import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'

class App extends Component {
  render () {
    return (
      <div>
        <Helmet
          titleTemplate='%sIOWho?'
          defaultTitle='IOWho - The blissfully simple money lending tracker'
          meta={[
            { name: 'description', content: 'The blissfully simple money lending tracker' }
          ]}
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
