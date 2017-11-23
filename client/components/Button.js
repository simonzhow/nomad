import styled from 'styled-components'
import { colors } from '../constants/styles'

export default styled.div`
  padding: 10px 30px;
  border-radius: 4px;
  background-color: ${props => { return props.disabled ? colors.lightGray : colors.green }};
  color: white;
  display: inline-block;
  cursor: pointer;
  text-align: center;
`
