/* global FB */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import styles from './LandingPage.css'
import * as actions from '../../actions'
import { colors } from '../../constants/styles'
import logo from '../../static/img/nomad_logo.png'

const silhouette = [
  require('../../static/img/silhouette1.jpg'),
  require('../../static/img/silhouette2.jpg'),
  require('../../static/img/silhouette3.jpg'),
  require('../../static/img/silhouette4.jpg'),
  require('../../static/img/silhouette5.jpg'),
  require('../../static/img/silhouette6.jpg'),
  require('../../static/img/silhouette7.jpg'),
  require('../../static/img/silhouette8.jpg'),
  require('../../static/img/silhouette9.jpg'),
]

const ButtonBase = styled.div`
  margin-top: 1em;
  padding: .8em 1.2em .8em 1.2em;
  border-radius: 1.5em;
  border-width: 4px;
  border-style: solid;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
`

const SignUpButton = ButtonBase.extend`
  color: ${colors.green};
  background-color: ${colors.white};
  border-color: ${colors.green};
`

const LoginButton = ButtonBase.extend`
  color: ${colors.white};
  background-color: ${colors.green};
`

const SplashContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`

const changeImage = keyframes`
	0% {opacity: 0;}
	10% {opacity: 1;}
	90% {opacity: 1;}
	100% {opacity: 0;}
`

const SplashCard = styled.div`
  height: 100%;
  width: 33%;
  flex-grow: 1;
  background-color: black;
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  animation: ${changeImage} 4s infinite;
  background-image: url(${props => props.image});
  background-size: cover;
`

export class LandingPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      imgcount: 0,
    }
    this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({
      time: Date.now(), imgcount: this.state.imgcount === 2 ? 0 : this.state.imgcount + 1,
    }), 4000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleLoginClick() {
    const onLoginComplete = () => {
      this.props.getUserAsync((user) => {
        if (user.home) {
          this.props.history.replace('/map')
        } else {
          this.props.history.replace('/onboard')
        }
      })
    }

    if (this.props.isLoggedIn) {
      onLoginComplete()
    } else {
      FB.login((res) => {
        if (res.status === 'connected') {
          this.props.updateAuth(res.authResponse.accessToken)
          onLoginComplete()
        }
      }, { scope: 'user_friends' })
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.landingCenterContent}>
          <img alt='logo' src={logo} />
          <a href='/onboard'>
            <SignUpButton>Join the community</SignUpButton>
          </a>
          <LoginButton onClick={this.handleLoginClick}>Log In</LoginButton>
        </div>
        <SplashContainer>
          <SplashCard image={silhouette[0 + this.state.imgcount]} />
          <SplashCard image={silhouette[3 + this.state.imgcount]} />
          <SplashCard image={silhouette[6 + this.state.imgcount]} />
        </SplashContainer>
      </div>
      )
  }
}

LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  updateAuth: PropTypes.func,
  getUserAsync: PropTypes.func,
  history: PropTypes.object,
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps, actions)(LandingPage)
