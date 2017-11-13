import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styled-components'

import TopUsersCardName from './topUsersCardName'
import TopUsersCardInfo from './topUsersCardInfo'

const TopUsersCardDiv = styles.div`
  border-radius: 2px;
  width: 200px;
  overflow: hidden;
  margin: 15px;
  outline: 0;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.2), 0 1px 8px 0 rgba(0,0,0,.12);
  transition: all 200ms ease-in;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
`

export default function TopUsersCard(props) {
  return (
    <TopUsersCardDiv>
      <TopUsersCardInfo position={props.position} />
      <TopUsersCardName name={props.name} />
    </TopUsersCardDiv>
  )
}

TopUsersCard.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
}
