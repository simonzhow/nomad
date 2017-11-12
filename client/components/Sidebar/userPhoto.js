import React from 'react';
import styled from 'styled-components';

import photo from './images/bibek-ghimire.jpg';

const UserPhotoDiv = styled.div`
  padding-top: 60px;
`;

const UserPhotoImg = styled.img`
  display: flex;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: white;
  background-size: 120px;
  height: 200px;
  width: 200px;
`;

export default function UserPhoto() {
  return (
    <UserPhotoDiv>
      <UserPhotoImg src={photo} />
    </UserPhotoDiv>
  );
}
