import React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import AddEntryButton from './AddEntryButton'
import MapPhoto from './MapPhoto'
import MapMarker from './MapMarker'

import travelEntries from '../dummy-data/travel-entries'

const gMapConfig = {
  key: 'AIzaSyCD8VMEGCp---T6qeG3CV5u9ISqatQ0LE0',
  language: 'en',
}

const MapWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`

const MapToolsOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
`

export default class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      entryModalOpen: false,
    }
    this.toggleEntryModal = this.toggleEntryModal.bind(this)
  }

  toggleEntryModal() {
    this.setState({ entryModalOpen: !this.state.entryModalOpen })
  }

  renderTravelEntries() {
    return travelEntries.map(entry => {
      if (entry.images && entry.images.length > 0) {
        return (
          <MapPhoto
            key={entry.name}
            name={entry.name}
            lat={entry.location.latitude}
            lng={entry.location.longitude}
            image={entry.images[0]}
          />
        )
      } else {
        return (
          <MapMarker
            key={entry.name}
            name={entry.name}
            lat={entry.location.latitude}
            lng={entry.location.longitude}
          />
        )
      }
    })
  }

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={gMapConfig}
          defaultCenter={{ lat: 47.44642, lng: -122.29949 }}
          defaultZoom={11}
        >
          {this.renderTravelEntries()}
        </GoogleMapReact>

        <MapToolsOverlay>
          <AddEntryButton onClick={this.toggleEntryModal} />
        </MapToolsOverlay>

      </MapWrapper>
    )
  }
}
