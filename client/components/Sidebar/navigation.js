import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const NavigationDiv = styled.div`
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  > a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledNavLink = styled(Link)`
  width: 220px;
  height: 60px;
  margin-bottom: 25px;
  border-radius: 30px;
  border-color: transparent;
  color: #66D6AE;
  background-color: white;
  font-size: 15px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:hover {
    background-color: #66D6AE;
    color: white;
  }
`

export default function Navigation() {
  return (
    <NavigationDiv>
      <StyledNavLink to='/map'>My Adventures</StyledNavLink>
      <StyledNavLink to='/leaderboard'>Leaderboard</StyledNavLink>
      <StyledNavLink to='/experiences'>Find Experiences</StyledNavLink>
      <StyledNavLink to='/friends'>My Friends</StyledNavLink>
    </NavigationDiv>

  )
}
