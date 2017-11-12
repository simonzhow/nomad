import React from 'react';
import styles from 'styled-components';

import TopUsersCard from './topUsersCard';

const TopUsersDiv = styles.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export default function TopUsers(props) {
  return (
    <TopUsersDiv>
      {
        (props.leaders).map((member, i) => (
          <TopUsersCard
            name={member.name}
            score={member.score}
            position={i + 1}
            facebook={member.facebook}
            key={i}
          />
        ))
      }
    </TopUsersDiv>
  );
}
