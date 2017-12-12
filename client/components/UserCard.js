import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Temp static element
import temp from './Sidebar/images/bibek-ghimire.jpg'

const UserCardDiv = styled.div`
  border-radius: 2px;
  width: 300px;
  overflow: hidden;
  margin: 15px;
  padding: 15px;
  outline: 0;
  margin: 10px;
`

const UserCardPhotoDiv = styled.div`
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50%;
  height: 200px;
  width: 200px;
  margin-bottom: 10px;
  transition: all 200ms ease-in;
  &:hover {
    transform: scale(1.05);
  }
`
const UserCardPhoto = styled.img`
  overflow: hidden;
  margin: auto;
  background-color: white;
  height: 200px;
  width: 200px;
`

const UserCardNameDiv = styled.div``
const UserCardName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const UserCardButtonDiv = styled.div`
  text-align: center;
  margin-top: 15px;
`
const UserCardButton = styled.button`
  padding: 10px 20px 10px 20px;
  background-color: white;
  color: #83D3B0;
  border-radius: 15px;
  cursor: pointer;
  border-color: #83D3B0;
  font-size: 14px;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #83D3B0;
    color: white;
  }
`

export default function UserCard(props) {
  return (
    <UserCardDiv>

      <UserCardPhotoDiv>
        <UserCardPhoto src={temp} />
      </UserCardPhotoDiv>

      <UserCardNameDiv>
        <UserCardName>{props.userInfo.name.first} {props.userInfo.name.last}</UserCardName>
      </UserCardNameDiv>

      <UserCardButtonDiv>
        <UserCardButton>View {props.userInfo.name.first}'s Map</UserCardButton>
      </UserCardButtonDiv>
    </UserCardDiv>
  )
}
UserCard.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    rank: PropTypes.string,
    miles: PropTypes.number,
  }),
}
