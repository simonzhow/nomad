import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../constants/styles'

const OptionSelectorDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-bottom: 10px;
  border: 2px solid ${colors.green};
  & > * {
    flex-grow: 1;
  }
`

const OptionItem = styled.div`
  background-color: ${props => { return props.selected ? colors.green : colors.white }};
  color: ${props => { return props.selected ? colors.white : colors.green }};
  padding: 4px;
  text-align: center;
  cursor: pointer;

  &:not(:last-child) {
    border-right: 2px solid ${colors.green};
  }
`

export default function OptionSelector(props) {
  const { options, selectedOptionId, onChange } = props
  return (
    <OptionSelectorDiv>
      {
        options.map(option => (
          <OptionItem
            key={option.id}
            selected={option.id === selectedOptionId}
            onClick={() => onChange(option.id)}
          >
            {option.text}
          </OptionItem>
        ))
      }
    </OptionSelectorDiv>
  )
}

OptionSelector.propTypes = {
  options: PropTypes.array.isRequired, // array of objects of shape { id: string, text: string }
  selectedOptionId: PropTypes.string.isRequired, // id of option from options that is currently selected
  onChange: PropTypes.func.isRequired,
}
