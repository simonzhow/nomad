import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const MapPhotoWrapper = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 4px solid white;
`

export default function MapPhoto(props) {
  return (
    <MapPhotoWrapper
      lat={props.lat}
      lng={props.lng}
      src={props.src}
      alt={props.alt}
    />
  )
}

MapPhoto.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

MapPhoto.defaultProps = {
  alt: '',
}
