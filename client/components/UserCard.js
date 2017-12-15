import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../constants/styles'

const UserCardDiv = styled.div`
  width: 200px;
  margin: 10px;
  padding: 15px;
  outline: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    &:not(:last-child) { margin-bottom: 8px; }
    &:not(:first-child) { margin-top: 8px; }
  }
`

const UserCardPhoto = styled.img`
  border-radius: 50%;
  width: 100%;
  margin-bottom: 10px;
  transition: all 200ms ease-in;
  &:hover {
    transform: scale(1.05);
  }
`

const UserCardName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`

const UserCardButton = styled.button`
  padding: 10px 20px 10px 20px;
  background-color: white;
  color: ${colors.green};
  border-radius: 15px;
  cursor: pointer;
  border-color: ${colors.green};
  font-size: 14px;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${colors.green};
    color: ${colors.white};
  }
`

export default function UserCard(props) {
  return (
    <UserCardDiv>
      <UserCardPhoto src={props.user.profile_pic} />
      <UserCardName>{`${props.user.first_name} ${props.user.last_name}`}</UserCardName>
      <UserCardButton>{`View ${props.user.first_name}'s Map`}</UserCardButton>
    </UserCardDiv>
  )
}
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
}
