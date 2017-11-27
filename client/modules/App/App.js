import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isMounted: false }
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  }
}

export default connect(mapStateToProps)(App)
