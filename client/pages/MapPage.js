import React from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'

const MapPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export default function MapPage() {
  return (
    <MapPageWrapper>
      <Sidebar />
      <Map />
    </MapPageWrapper>
  )
}
