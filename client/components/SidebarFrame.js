import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'

const SidebarFrameWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

   > *:nth-child(2) {
    flex-grow: 1;
  }
`

export default function SidebarFrame(props) {
  return (
    <SidebarFrameWrapper>
      <Sidebar />
      {props.children}
    </SidebarFrameWrapper>
  )
}

SidebarFrame.propTypes = {
  children: PropTypes.object,
}
