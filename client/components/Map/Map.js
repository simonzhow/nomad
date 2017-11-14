import React from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'

const API_KEY = 'AIzaSyCD8VMEGCp---T6qeG3CV5u9ISqatQ0LE0'

const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;
`

export default function Map() {
  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: API_KEY,
          language: 'ru',
        }}
        defaultCenter={{ lat: 59.95, lng: 30.33 }}
        defaultZoom={11}
      />
    </MapWrapper>
  )
}
