import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'
import { colors } from '../../../constants/styles'

const UserTableRow = styles.tr`

`

const UserTableElem = styles.td`
  border: 1px solid ${colors.lightGray};
  text-align: left;
  padding: 8px;
  position: relative;
`

const UsersTableRankImg = styles.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
`

export default function UsersTableRow(props) {
  return (
    <UserTableRow>
      <UserTableElem>{props.number}</UserTableElem>
      <UserTableElem>{props.name.first} {props.name.last}</UserTableElem>
      <UserTableElem>
        {props.rank.title}
        <UsersTableRankImg src={props.rank.image} />
      </UserTableElem>
      <UserTableElem>{props.score}</UserTableElem>
    </UserTableRow>
  )
}

UsersTableRow.propTypes = {
  number: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
  }),
  rank: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
  }),
}
