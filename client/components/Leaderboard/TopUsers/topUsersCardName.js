import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'

const TopUsersCardNameDiv = styles.div`
  text-align: center;
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: bold;
`

export default function TopUsersCardName(props) {
  return (
    <TopUsersCardNameDiv>
      {props.name.first} {props.name.last}
    </TopUsersCardNameDiv>
  )
}

TopUsersCardName.propTypes = {
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
  }),
}
