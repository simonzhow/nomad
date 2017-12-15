import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import UserCard from './UserCard'
import SearchBar from './SearchBar'
import actions from '../actions'

const FriendsDiv = styled.div`
  padding: 30px;
  overflow: auto;
  transition: margin-left 0.125s ease-in-out;
`

const FriendsTitleDiv = styled.div``

const FriendsTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

const FriendsSearchDiv = styled.div`
  margin-bottom: 30px;
`

const FriendsUserCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: left;
`

export class Friends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
    }
    this.props.requestFriendsUpdate()
  }

  render() {
    const getFullName = (user) => (`${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`)
    // this search works matching for any string within a name
    // TODO: need to figure out how to match from beginning ONLY
    const filteredFriends = this.props.friends.filter((friend) => {
      return getFullName(friend).includes(this.state.searchQuery.toLowerCase())
    }).sort((a, b) => {
      const aName = getFullName(a)
      const bName = getFullName(b)
      if (aName === bName) { return 0 }
      return (aName < bName) ? -1 : 1
    })

    return (
      <FriendsDiv>
        <FriendsTitleDiv>
          <FriendsTitle>My Friends</FriendsTitle>
        </FriendsTitleDiv>

        <FriendsSearchDiv>
          <SearchBar
            handleChange={(text) => this.setState({ searchQuery: text })}
          />
        </FriendsSearchDiv>

        <FriendsUserCards>
          {
            filteredFriends.map((user, i) => (
              <UserCard key={i} user={user} />
            ))
          }
        </FriendsUserCards>
      </FriendsDiv>
    )
  }

}

Friends.propTypes = {
  friends: PropTypes.array,
  requestFriendsUpdate: PropTypes.func,
}

const mapStateToProps = (state) => ({
  friends: state.friends,
})

export default connect(mapStateToProps, actions)(Friends)
