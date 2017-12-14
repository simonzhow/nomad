import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/styles'

const HomeMarkerWrapper = styled.div`
  width: 35px;
  height: 35px;
  transform: translate(-50%, -100%);
  cursor: pointer;
  border-radius: 50%;
  background-color: ${colors.white};
`

export default function HomeMarker() {
  /* eslint-disable max-len */
  return (
    <HomeMarkerWrapper>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 44'>
        <path fill={colors.green} d='M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm12 20h-1.5c-.3 0-.5.2-.5.5V33c0 .6-.4 1-1 1H13c-.6 0-1-.4-1-1V20.5c0-.3-.2-.5-.5-.5H10c-.6 0-1-.4-1-1 0-.3.2-.7.4-.8l12-8c.2-.1.3-.2.6-.2s.4.1.6.2l12 8c.3.2.4.5.4.8 0 .6-.4 1-1 1z' />
        <path fill={colors.green} d='M22.3 14.8c-.2-.1-.4-.1-.6 0l-5.5 3.7c-.1.1-.2.2-.2.4v10.6c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5V25c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v4.5c0 .3.2.5.5.5h3c.3 0 .5-.2.5-.5V18.9c0-.2-.1-.3-.2-.4l-5.5-3.7z' />
      </svg>
    </HomeMarkerWrapper>
  )
}
