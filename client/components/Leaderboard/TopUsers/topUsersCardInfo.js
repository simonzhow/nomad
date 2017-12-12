import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TopUsersCardInfoDiv = styled.div`
  text-align: center;
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`

const TopUsersCardPositionDiv = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`

const TopUsersCardRankDiv = styled.div`

`

const TopUsersCardRankImg = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`
const TopUsersCardRankName = styled.div`
  font-size: 12px;
  font-style: italic;
`

export default function TopUsersCardInfo(props) {
  return (
    <TopUsersCardInfoDiv>
      <TopUsersCardPositionDiv>
        #{props.position}
      </TopUsersCardPositionDiv>
      <TopUsersCardRankDiv>
        <TopUsersCardRankImg src={props.rank.image} />
        <TopUsersCardRankName>
          {props.rank.title}
        </TopUsersCardRankName>
      </TopUsersCardRankDiv>
    </TopUsersCardInfoDiv>
  )
}

TopUsersCardInfo.propTypes = {
  rank: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  position: PropTypes.number,
}
