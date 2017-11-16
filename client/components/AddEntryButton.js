import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../constants/styles'

const AddEntryButtonDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${colors.blue};
  color: ${colors.white};
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export default function AddEntryButton(props) {
  return (
    <AddEntryButtonDiv onClick={props.onClick}>
      {'+'}
    </AddEntryButtonDiv>
  )
}

AddEntryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}
