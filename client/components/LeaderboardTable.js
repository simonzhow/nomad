import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../constants/styles'
import { getRankFromPoints } from '../util/map-helpers'

const UsersTableTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const UsersTableHeaderRow = styled.tr`

`

const UsersTableHeaderElem = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding-left: 8px;

  padding-top: 20px;
  padding-bottom: 10px;
`

const UserTableRow = styled.tr`

`

const UserTableElem = styled.td`
  border: 1px solid ${colors.lightGray};
  text-align: left;
  padding: 8px;
  position: relative;
`

const RankImage = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 8px;
`

export default function LeaderboardTable(props) {
  return (
    <UsersTableTable>
      <thead>
        <UsersTableHeaderRow>
          <UsersTableHeaderElem>#</UsersTableHeaderElem>
          <UsersTableHeaderElem>Name</UsersTableHeaderElem>
          <UsersTableHeaderElem>Rank</UsersTableHeaderElem>
          <UsersTableHeaderElem>Points</UsersTableHeaderElem>
        </UsersTableHeaderRow>
      </thead>
      <tbody>
        {
          (props.users).map((user, i) => {
            const { name: rankName, image: rankImage } = getRankFromPoints(user.points)
            return (
              <UserTableRow key={user.user_id}>
                <UserTableElem>{i + props.startingPosition}</UserTableElem>
                <UserTableElem>{`${user.first_name} ${user.last_name}`}</UserTableElem>
                <UserTableElem>
                  <RankImage alt={rankName} src={rankImage} />{rankName}
                </UserTableElem>
                <UserTableElem>{user.points}</UserTableElem>
              </UserTableRow>
            )
          })
        }
      </tbody>
    </UsersTableTable>
  )
}

LeaderboardTable.propTypes = {
  users: PropTypes.array,
  startingPosition: PropTypes.number,
}
