import React, { Component } from 'react'
import styled from 'styled-components'
import UserCard from './UserCard'
import SearchBar from './SearchBar'

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

// STATIC INPUT, MUST REPLACE
const tempUser = {
  users: [
    {
      name: {
        first: 'Bibek',
        last: 'Ghimire',
      },
      rank: 'World Traveler',
      miles: 420,
    },
    {
      name: {
        first: 'Monil',
        last: 'Patel',
      },
      rank: 'World Traveler',
      miles: 420,
    },
    {
      name: {
        first: 'Simon',
        last: 'Zhou',
      },
      rank: 'World Traveler',
      miles: 420,
    },
    {
      name: {
        first: 'Anshul',
        last: 'Aggarwal',
      },
      rank: 'World Traveler',
      miles: 420,
    },
  ],
}

export class Friends extends Component {
  constructor() {
    super()
    this.state = {
      searchQuery: '',
    }
  }

  render() {
    // this search works matching for any string within a name
    // TODO: need to figure out how to match from beginning ONLY
    const usersInQuery = tempUser.users.filter((user) => {
      const lowerFirst = user.name.first.toLowerCase()
      const lowerLast = user.name.last.toLowerCase()

      const lowerFull = lowerFirst.concat(' ').concat(lowerLast)
      const lowerQuery = this.state.searchQuery.toLowerCase()

      return lowerFull.includes(lowerQuery)
    })

    return (
      <FriendsDiv>
        <FriendsTitleDiv>
          <FriendsTitle>My Friends</FriendsTitle>
        </FriendsTitleDiv>

        <FriendsSearchDiv>
          <SearchBar handleChange={(text) => this.setState({ searchQuery: text })} />
        </FriendsSearchDiv>

        <FriendsUserCards>
          {
            usersInQuery.map((user, i) => (
              <UserCard key={i} userInfo={user} />
            ))
          }
        </FriendsUserCards>
      </FriendsDiv>
    )
  }

}

export default Friends
