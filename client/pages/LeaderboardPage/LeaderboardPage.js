import React from 'react'
import styled from 'styled-components'

import Sidebar from '../../components/Sidebar'
import Leaderboard from '../../components/Leaderboard'
import staffMembers from '../../static/MembersData'

const LeaderboardPageDiv = styled.div`

`

export default function LeaderboardPage() {
  const sortMembersByScore = (a, b) => {
    return b.score - a.score
  }

  return (
    <LeaderboardPageDiv>
      <Sidebar />
      <Leaderboard
        members={staffMembers.members.sort(sortMembersByScore)}
      />
    </LeaderboardPageDiv>
  )
}
