import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import LeaderboardTopCard from './LeaderboardTopCard'
import LeaderboardTable from './LeaderboardTable'
import * as actions from '../actions'

const LeaderboardDiv = styled.div`
  padding: 30px;
  overflow: auto;
  transition: margin-left 0.125s ease-in-out;
`

const LeaderboardTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

const TopUsers = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  margin-bottom: 30px;
`

class Leaderboard extends React.Component {
  constructor(props) {
    super(props)
    this.props.requestFriendsUpdate()
  }

  render() {
    const { friendsList } = this.props
    friendsList.sort((a, b) => b.points - a.points)
    const leaders = friendsList.slice(0, 3)
    const remainingUsers = friendsList.slice(3)

    return (
      <LeaderboardDiv>
        <LeaderboardTitle>Leaderboard</LeaderboardTitle>
        <TopUsers>
          {
            leaders.map((member, i) => (
              <LeaderboardTopCard
                key={member.user_id}
                name={`${member.first_name} ${member.last_name}`}
                points={member.points}
                position={i + 1}
                image={member.profile_pic}
              />
            ))
          }
        </TopUsers>
        <LeaderboardTable users={remainingUsers} startingPosition={4} />
      </LeaderboardDiv>
    )
  }
}

Leaderboard.propTypes = {
  friendsList: PropTypes.array,
  requestFriendsUpdate: PropTypes.func,
}

const mapStateToProps = (state) => ({
  friendsList: state.friends.concat(state.user),
})

export default connect(mapStateToProps, actions)(Leaderboard)
