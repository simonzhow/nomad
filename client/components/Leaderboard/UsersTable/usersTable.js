import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import UsersTableRow from './usersTableRow'

const NORMAL_OFFSET = 4
const UsersTableDiv = styled.div`
  margin-top: 30px;
`

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

export default function UsersTable(props) {
  return (
    <UsersTableDiv>
      <UsersTableTable>
        <UsersTableHeaderRow>
          <UsersTableHeaderElem>#</UsersTableHeaderElem>
          <UsersTableHeaderElem>Name</UsersTableHeaderElem>
          <UsersTableHeaderElem>Rank</UsersTableHeaderElem>
          <UsersTableHeaderElem>Score</UsersTableHeaderElem>
        </UsersTableHeaderRow>
        {(props.users).map((user, i) => (
          <UsersTableRow
            key={i}
            number={i + NORMAL_OFFSET}
            name={user.name}
            rank={user.rank}
            score={user.score}
          />
        ))}
      </UsersTableTable>
    </UsersTableDiv>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array,
}
