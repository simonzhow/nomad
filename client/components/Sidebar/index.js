import React from 'react';
import styled from 'styled-components';

import UserPhoto from './userPhoto';
import UserName from './userName';
import Navigation from './navigation';

const SidebarDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  overflow-y: scroll;
  width: 300px;
  height: auto;
  min-height: 100%;
  transition: left 0.125s ease-in-out;
`;

const SidebarContainer = styled.div`
  min-height: 680px;
`;


export default function Sidebar() {
  return (
    <SidebarDiv>
      <SidebarContainer>
        <UserPhoto />
        <UserName />
        <Navigation />
      </SidebarContainer>
    </SidebarDiv>

  );
}
