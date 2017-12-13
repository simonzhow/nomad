import React from 'react'
import PropTypes from 'prop-types'

const App = (props) => (<div>{props.children}</div>)

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
}

export default App
