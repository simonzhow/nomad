import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TopUsers from './TopUsers/topUsers'
import UsersTable from './UsersTable/usersTable'
import users from '../../static/MembersData'

const LeaderboardDiv = styled.div`
  padding: 30px;
  overflow: auto;
  transition: margin-left 0.125s ease-in-out;
`

const LeaderboardTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

export default function Leaderboard() {
  const sortMembersByScore = (a, b) => (b.score - a.score)
  const members = users.members.sort(sortMembersByScore)
  const leaders = members.slice(0, 3)
  const remainingMembers = members.slice(3)

  return (
    <LeaderboardDiv>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      <TopUsers leaders={leaders} />
      <UsersTable users={remainingMembers} />

    </LeaderboardDiv>
  )
}

Leaderboard.propTypes = {
  members: PropTypes.array,
}
