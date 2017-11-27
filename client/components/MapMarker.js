import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import mapMarkerIcon from '../static/img/map-marker.png'
import { shadows } from '../constants/styles'

const calculateBorderWidth = (imageSize) => (imageSize * 0.05)

const MapPhotoWrapper = styled.div`
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 1px;
  border: ${props => calculateBorderWidth(props.size)}px solid white;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  &:hover {
    transform: translate(-50%, -50%) scale(1.5);
    box-shadow: ${shadows.default};
  }
`

const MapMarkerImage = styled.img`
  width: 35px;
  height: 35px;
  transform: translate(-50%, -100%);
  cursor: pointer;
`

export default function MapMarker(props) {
  const { images, onClick, size } = props
  if (images && Array.isArray(images) && images.length > 0) {
    return (
      <MapPhotoWrapper
        onClick={onClick}
        src={images[0]}
        size={size}
      />
    )
  } else {
    return (
      <MapMarkerImage
        src={mapMarkerIcon}
      />
    )
  }
}

MapMarker.propTypes = {
  name: PropTypes.string,
  images: PropTypes.array,
  onClick: PropTypes.func,
  size: PropTypes.number,
}

MapMarker.defaultProps = {
  name: 'Some image',
  size: 120,
}
