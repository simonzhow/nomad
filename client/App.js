/* global FB */

/**
 * Root Component
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import * as actions from './actions'
import * as fbSDK from './util/fb-sdk'
import routes from './routes'

// Base stylesheet
require('./main.css')

class App extends React.Component {
  constructor(props) {
    super(props)
    // Initialize the FB SDK; on complete, update auth status in Redux store
    fbSDK.initialize(() => {
      FB.getLoginStatus(res => {
        if (res.status === 'connected') {
          this.props.updateAuth(res.authResponse.accessToken)
          this.props.getUserAsync()
        }
      }, true)
    })
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  updateAuth: PropTypes.func,
  getUserAsync: PropTypes.func,
}

const mapStateToProps = () => ({})

export default connect(mapStateToProps, actions)(App)
