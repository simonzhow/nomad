/* eslint-disable global-require */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './modules/App/App'
import SidebarFrame from './components/SidebarFrame'
import LandingPage from './pages/LandingPage'
import Leaderboard from './components/Leaderboard/Leaderboard'
import Map from './components/Map'
import Friends from './components/Friends'
import Experiences from './components/Experiences/Experiences'
import Onboard from './pages/Onboarding'
import requireAuth from './components/require-auth'

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require)
  }
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path='/' component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='/' component={requireAuth(SidebarFrame)}>
      {/* TODO: Set up proper index route (404 page) */}
      <IndexRoute component={Leaderboard} />
      <Route path='/leaderboard' component={requireAuth(Leaderboard)} />
      <Route path='/map' component={requireAuth(Map)} />
      <Route path='/experiences' component={requireAuth(Experiences)} />
      <Route path='/friends' component={requireAuth(Friends)} />
    </Route>
    <Route path='/onboard' component={Onboard} />
  </Route>
)
