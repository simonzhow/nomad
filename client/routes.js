/* eslint-disable global-require */
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import SidebarFrame from './components/SidebarFrame'
import LandingPage from './pages/LandingPage'
import Leaderboard from './components/Leaderboard'
import Map from './components/Map'
import Friends from './components/Friends'
import Experiences from './components/Experiences'
import Onboard from './pages/Onboarding'
import requireAuth from './components/require-auth'

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require)
  }
}

// eslint-disable-next-line react/prop-types
const RouteWrapper = (props) => <div>{props.children}</div>

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path='/' component={RouteWrapper}>
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
