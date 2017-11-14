import React from 'react'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import Sidebar from '../../components/Sidebar'
import MapPhoto from '../../components/MapPhoto'

const GOOGLE_MAP_API_KEY = 'AIzaSyCD8VMEGCp---T6qeG3CV5u9ISqatQ0LE0'

const MapPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
`

export default function MapPage() {
  const bootstrapURLKeys = { key: GOOGLE_MAP_API_KEY, language: 'en' }

  return (
    <MapPageWrapper>
      <Sidebar />
      <GoogleMapReact
        bootstrapURLKeys={bootstrapURLKeys}
        defaultCenter={{ lat: 47.44642, lng: -122.29949 }}
        defaultZoom={11}
      >
        <MapPhoto
          lat={47.446}
          lng={-122.32}
          src={'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAt6AAAAJGVkNGM2ZDRhLTIwOTQtNDJkNC04ZDI4LWYwMzgxNDNmNDI4OQ.jpg'}
          alt='Mihir Mathur'
        />
      </GoogleMapReact>
    </MapPageWrapper>
  )
}
