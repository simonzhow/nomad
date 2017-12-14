import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../constants/styles'

const spinAnimation = keyframes`
  to { transform: rotate(360deg); }
`
const SpinnerWrapper = styled.div`
  position: relative;
`

const SpinnerDiv = styled.div`
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid ${colors.lightGray};
  border-top-color: ${colors.green};
  animation: ${spinAnimation} .6s linear infinite;
`

export default () => (
  <SpinnerWrapper><SpinnerDiv /></SpinnerWrapper>
)
