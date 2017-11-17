import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'
import TopUsers from './TopUsers/topUsers'
import staffMembers from '../../static/MembersData'

const LeaderboardDiv = styles.div`
  padding: 30px;
  overflow: visible;
  transition: margin-left 0.125s ease-in-out;
`

const LeaderboardTitle = styles.h1`
  text-align: center;
  margin-bottom: 30px;
`

export default function Leaderboard() {
  const sortMembersByScore = (a, b) => (b.score - a.score)
  const mems = staffMembers.members.sort(sortMembersByScore)
  const leaders = mems.slice(0, 3)

  return (
    <LeaderboardDiv>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      <TopUsers leaders={leaders} />
    </LeaderboardDiv>
  )
}

Leaderboard.propTypes = {
  members: PropTypes.array,
}
