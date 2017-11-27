import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MapPhotoWrapper = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 4px solid white;
  opacity: 0.7;
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.5);
    opacity: 1;
  }
`

export default function MapPhoto(props) {
  return (
    <MapPhotoWrapper
      onClick={props.onClick}
      src={props.image}
      alt={props.name}
    />
  )
}

MapPhoto.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  onClick: PropTypes.func,
}

MapPhoto.defaultProps = {
  name: 'Some image',
}
