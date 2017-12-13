import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import UserPhoto from './userPhoto'
import Navigation from './navigation'

import sidebarimage from '../../static/img/sidebar.png'

const SidebarDiv = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  width: 300px;
  height: 100%;
  transition: left 0.125s ease-in-out;
  background-image: url(${sidebarimage});
  flex-shrink: 0;
`

const SidebarContainer = styled.div`
  min-height: 680px;
`

const UserName = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 30px;
  color: white;
`

const formatName = (name) => (name ? `${name.first} ${name.last}` : '')

function Sidebar(props) {
  return (
    <SidebarDiv>
      <SidebarContainer>
        <UserPhoto src={props.profilePic} />
        <UserName>{formatName(props.name)}</UserName>
        <Navigation />
      </SidebarContainer>
    </SidebarDiv>
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
