/* global FB */
import { APP_ID } from '../config/fb'

export const initialize = (callback) => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.11',
    })
    callback()
  };

  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) { return }
    const js = d.createElement(s); js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  }(document, 'script', 'facebook-jssdk'))
}
