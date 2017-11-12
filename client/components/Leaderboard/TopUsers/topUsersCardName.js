import React from 'react';
import styles from 'styled-components';

const TopUsersCardNameDiv = styles.div`
  text-align: center;
  font-size: 20px;
`;

export default function TopUsersCardName(props) {
  return (
    <TopUsersCardNameDiv>
      {props.name.first} {props.name.last}
    </TopUsersCardNameDiv>
  );
}
