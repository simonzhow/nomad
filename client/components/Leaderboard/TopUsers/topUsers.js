import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'

import TopUsersCard from './topUsersCard'

const LEADER_OFFSET = 1

const TopUsersDiv = styles.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
`

export default function TopUsers(props) {
  return (
    <TopUsersDiv>
      {
        (props.leaders).map((member, i) => (
          <TopUsersCard
            name={member.name}
            score={member.score}
            rank={member.rank}
            position={i + LEADER_OFFSET}
            facebook={member.facebook}
            key={i}
          />
        ))
      }
    </TopUsersDiv>
  )
}

TopUsers.propTypes = {
  leaders: PropTypes.array,
}
