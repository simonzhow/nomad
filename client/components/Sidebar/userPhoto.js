import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UserPhotoDiv = styled.div`
  padding-top: 60px;
`

const UserPhotoImg = styled.img`
  display: flex;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: white;
  background-size: 120px;
  height: 200px;
  width: 200px;
`

export default function UserPhoto(props) {
  return (
    <UserPhotoDiv>
      <UserPhotoImg src={props.src} />
    </UserPhotoDiv>
  )
}

UserPhoto.propTypes = {
  src: PropTypes.string.isRequired,
}
