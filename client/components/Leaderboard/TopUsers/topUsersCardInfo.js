import React from 'react';
import styles from 'styled-components';

const TopUsersCardInfoDiv = styles.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

export default function TopUsersCardInfo(props) {
  return (
    <TopUsersCardInfoDiv>
      #{props.position}
    </TopUsersCardInfoDiv>
  );
}
