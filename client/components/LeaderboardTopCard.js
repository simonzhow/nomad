import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getRankFromPoints } from '../util/map-helpers'
import { colors } from '../constants/styles'

const TopUsersCardDiv = styled.div`
  border-radius: 2px;
  width: 200px;
  overflow: hidden;
  padding: 10px;
  outline: 0;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.2), 0 1px 8px 0 rgba(0,0,0,.12);
  transition: all 200ms ease-in;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }
  & > * {
    &:not(:last-child) { margin-bottom: 4px; }
    &:not(:first-child) { margin-top: 4px; }
  }
`

const PositionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

const RankImage = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`
const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid ${colors.green};
`

const UserRank = styled.div`
  font-size: 12px;
  font-style: italic;
  display: flex;
  align-items: center;
`

const NameText = styled.div`
  text-align: center;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: bold;
`

const PointsText = styled.div`
  font-size: 16px;
  font-weight: bold;
`

export default function LeaderboardTopCard(props) {
  const rank = getRankFromPoints(props.points)
  return (
    <TopUsersCardDiv>
      <PositionText>{`#${props.position}`}</PositionText>
      <UserImage src={props.image} />
      <NameText>{props.name}</NameText>
      <UserRank>
        <RankImage src={rank.image} />{rank.name}
      </UserRank>
      <PointsText>{`${props.points} pts`}</PointsText>
    </TopUsersCardDiv>
  )
}

LeaderboardTopCard.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}
