// @flow
/* global FB */

/*
Higher-order React component that does the following
  * Checks for login status on mount
    * If logged in, updates Redux store with credentials
  * If no credentials are found in Redux store, redirects user to home page
*/

import * as React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../actions'

const requireAuth = (ComposedComponent) => {
  /* eslint-disable react/prop-types */
  const Wrapper = (props): * => {
    if (props.isLoggedIn === null) {
      // Don't know if user is logged in yet, wait for Redux auth store update
      return null
    } else if (props.isLoggedIn) {
      // Received authentication status in Redux and user is indeed logged in
      if (props.user === null) {
        // Don't have user object yet, wait for Redux user store update
        return null
      } else {
        if (!props.user.home) {
          // Received user object and user does not have a home yet, send to onboard
          props.history.replace('/onboard')
          return <div />
        } else {
          // User is logged in and onboarded, allow them to view this route
          return <ComposedComponent {...props} />
        }
      }
    }

    // Have verified that the user is not logged in, redirect to landing page
    props.history.replace('/')
    return <div />
  }
  /* eslint-disable */

  Wrapper.propTypes = {
    isLoggedIn: PropTypes.bool,
    history: PropTypes.object,
  }

  const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.user
  })

  return connect(mapStateToProps, actions)(withRouter(Wrapper))
}

export default requireAuth
