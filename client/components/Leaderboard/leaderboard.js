import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'

import TopUsers from './TopUsers/topUsers'
import UsersTable from './UsersTable/usersTable'

const LeaderboardDiv = styles.div`
  margin-left: 300px;
  padding: 30px;
  overflow: visible;
  transition: margin-left 0.125s ease-in-out;
`

const LeaderboardTitle = styles.h1`
  text-align: center;
  margin-bottom: 30px;
`

export default function Leaderboard(props) {
  const leaders = (props.members).slice(0, 3)
  const users = (props.members).slice(3)

  return (
    <LeaderboardDiv>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      <TopUsers leaders={leaders} />
      <UsersTable users={users} />

    </LeaderboardDiv>
  )
}

Leaderboard.propTypes = {
  members: PropTypes.array,
}
