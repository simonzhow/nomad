import React from 'react'
import styled from 'styled-components'
// import { NavLink } from 'react-router-dom';

const NavigationDiv = styled.div`
  text-align: center;
  margin-top: 50px;
`

const NavigationButton = styled.button`
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
      <NavigationButton>My Adventures</NavigationButton>
      <NavigationButton>Leaderboard</NavigationButton>
      <NavigationButton>Find Experiences</NavigationButton>
      <NavigationButton>My Friends</NavigationButton>
    </NavigationDiv>

  )
}
