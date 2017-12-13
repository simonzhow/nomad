/* global FB */

/**
 * Root Component
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider, connect } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import * as actions from 'actions'

// Import Routes
import routes from './routes'

// Base stylesheet
require('./main.css')

class App extends React.Component {
  constructor(props) {
    super(props)
    window.fbAsyncInit = () => {
      FB.init({
        appId: '499768263743636',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.11',
      })
      FB.getLoginStatus(res => {
        if (res.status === 'connected') {
          this.props.updateAuth(res.authResponse.accessToken)
        }
      })
    }

   /* eslint-disable */
   (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* eslint-enable */
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
}

export default connect(() => ({}), actions)(App)
