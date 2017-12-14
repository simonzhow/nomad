import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { colors } from '../constants/styles'
import sidebarImage from '../static/img/sidebar.png'

const SidebarContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  background-image: url(${sidebarImage});
`

const SidebarDiv = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`

const UserName = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: white;
`

const UserInfoWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    &:not(:last-child) { margin-bottom: 5px; }
    &:not(:first-child) { margin-top: 5px; }
  }
`

const UserPhoto = styled.img`
  border-radius: 50%;
  border: 5px solid ${colors.white};
  max-width: 60%;
  flex-shrink: 1;
`

const NavigationDiv = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;

  > a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledNavLink = styled(Link)`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  margin-bottom: 25px;
  border-radius: 30px;
  border-color: transparent;
  color: ${colors.green};
  background-color: white;
  font-size: 15px;
  cursor: pointer;
  transition: 0.3s ease all;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: ${colors.green};
    color: white;
  }
`

const formatName = (name) => (name ? `${name.first} ${name.last}` : '')

function Sidebar(props) {
  return (
    <SidebarContainer>
      <SidebarDiv>
        <UserInfoWrapper>
          <UserPhoto src={props.profilePic} />
          <UserName>{formatName(props.name)}</UserName>
        </UserInfoWrapper>
        <NavigationDiv>
          <StyledNavLink to='/map'>My Adventures</StyledNavLink>
          <StyledNavLink to='/leaderboard'>Leaderboard</StyledNavLink>
          <StyledNavLink to='/experiences'>Find Experiences</StyledNavLink>
          <StyledNavLink to='/friends'>My Friends</StyledNavLink>
        </NavigationDiv>
      </SidebarDiv>
    </SidebarContainer>
  )
}

Sidebar.propTypes = {
  name: PropTypes.object.isRequired,
  profilePic: PropTypes.string,
}

const mapStateToProps = (state) => ({
  name: {
    first: state.user ? state.user.first_name : '',
    last: state.user ? state.user.last_name : '',
  },
  profilePic: state.user ? state.user.profile_pic : '',
})

export default connect(mapStateToProps, {})(Sidebar)
