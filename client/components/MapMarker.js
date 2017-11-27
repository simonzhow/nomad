import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import mapMarkerIcon from '../static/img/map-marker.png'

const MapMarkerImage = styled.img`
  width: 25px;
  height: 25px;
  transform: translate(-50%, -100%);
`

export default function MapMarker() {
  return (
    <MapMarkerImage src={mapMarkerIcon} />
  )
}

MapMarker.propTypes = {
  name: PropTypes.string,
}
