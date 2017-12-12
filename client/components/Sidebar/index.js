import React from 'react'
import styled from 'styled-components'

import UserPhoto from './userPhoto'
import UserName from './userName'
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


export default function Sidebar() {
  return (
    <SidebarDiv>
      <SidebarContainer>
        <UserPhoto />
        <UserName />
        <Navigation />
      </SidebarContainer>
    </SidebarDiv>

  )
}
