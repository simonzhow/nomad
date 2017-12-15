import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import UserCard from './UserCard'
import SearchBar from './SearchBar'
import FriendMap from './FriendMap'
import CloseIcon from './CloseIcon'
import actions from '../actions'
import { colors, shadows } from '../constants/styles'

const FriendsDiv = styled.div`
  padding: 30px;
  overflow: auto;
  transition: margin-left 0.125s ease-in-out;
  position: relative;
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

const FriendMapBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.4);
`

const FriendMapModal = styled.div`
  position: relative;
  width: 70%;
  background-color: ${colors.white};
  box-shadow: ${shadows.default};
  border-radius: 10px;
  padding: 30px;
`

const MapCloseButton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  cursor: pointer;
`

export class Friends extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      selectedFriend: null,
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
          {filteredFriends.map(user =>
            <UserCard
              key={user.user_id}
              user={user}
              onSelect={() => { this.setState({ selectedFriend: user }) }}
            />
          )}
        </FriendsUserCards>

        {this.state.selectedFriend && (
          <FriendMapBackground>
            <FriendMapModal>
              <MapCloseButton
                onClick={() => { this.setState({ selectedFriend: null }) }}
              >
                <CloseIcon />
              </MapCloseButton>
              <FriendMap friend={this.state.selectedFriend} />
            </FriendMapModal>
          </FriendMapBackground>
        )}
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
