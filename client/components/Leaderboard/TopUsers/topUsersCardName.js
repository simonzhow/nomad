import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'

const TopUsersCardNameDiv = styles.div`
  text-align: center;
  font-size: 12px;
  margin-bottom: 15px;
`

export default function TopUsersCardName(props) {
  return (
    <TopUsersCardNameDiv>
      {props.name.first} {props.name.last}
    </TopUsersCardNameDiv>
  )
}

TopUsersCardName.propTypes = {
  name: PropTypes.object,
}
