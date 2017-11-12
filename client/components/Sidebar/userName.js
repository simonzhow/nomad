import React from 'react';
import styled from 'styled-components';

const UserNameDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
`;

const Name = styled.h3`
  font-size: 30px;
`;

export default function UserName() {
  return (
    <UserNameDiv>
      <Name>Bibek Ghimire</Name>
    </UserNameDiv>
  );
}
