import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../constants/styles'

const MapMarkerWrapper = styled.div`
  background-color: ${colors.white};
  border: 2px solid ${colors.blue};
  color: ${colors.blue};
  padding: 5px;
  text-overflow: ellipsis;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0.7;
  transition: all 0.2s ease;
  &:hover {
    opacity: 1.0;
  }
`

export default function MapMarker(props) {
  return (
    <MapMarkerWrapper>
      {props.name}
    </MapMarkerWrapper>
  )
}

MapMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  name: PropTypes.string,
}
