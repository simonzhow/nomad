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
      return null
    } else if (props.isLoggedIn) {
      return <ComposedComponent {...props} />
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
  })

  return connect(mapStateToProps, actions)(withRouter(Wrapper))
}

export default requireAuth
