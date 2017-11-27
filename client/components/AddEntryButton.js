import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors, shadows } from '../constants/styles'

const AddEntryButtonDiv = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid transparent;
  border-radius: 50%;
  background-color: ${props => { return props.isOpen ? colors.red : colors.green }};
  color: ${colors.white};
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  transform: rotate(${props => { return props.isOpen ? 45 : 0 }}deg);
  &:hover {
    transform: scale(0.9) rotate(${props => { return props.isOpen ? 45 : 0 }}deg);
    box-shadow: ${shadows.default};
  }
`

export default function AddEntryButton(props) {
  return (
    <AddEntryButtonDiv
      isOpen={props.isOpen}
      onClick={props.onClick}
    >
      {'+'}
    </AddEntryButtonDiv>
  )
}

AddEntryButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}
