import React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import AddEntryButton from './AddEntryButton'
import AddEntryModal from './AddEntryModal'
import MapPhoto from './MapPhoto'
import MapMarker from './MapMarker'
import GMAP_CONFIG from '../config/google-maps'

import travelEntries from '../dummy-data/travel-entries'

const MapWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`

const GoogleMapReactWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  filter: ${props => { return props.blur ? 'brightness(0.5)' : 'none' }};
`

const MapToolsOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 50px 20px 20px;

`

const AddEntryModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 85%;
  max-width: 900px;
  transform: translate(-50%, -50%);
`

export default class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      addEntryModalOpen: false,
    }
    this.toggleAddEntryModal = this.toggleAddEntryModal.bind(this)
  }

  toggleAddEntryModal() {
    this.setState({ addEntryModalOpen: !this.state.addEntryModalOpen })
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
        <GoogleMapReactWrapper blur={this.state.addEntryModalOpen}>
          <GoogleMapReact
            bootstrapURLKeys={GMAP_CONFIG.bootstrapURLKeys}
            defaultCenter={GMAP_CONFIG.defaultCenter}
            defaultZoom={GMAP_CONFIG.defaultZoom}
          >
            {this.renderTravelEntries()}
          </GoogleMapReact>
        </GoogleMapReactWrapper>

        <MapToolsOverlay>
          <AddEntryButton
            isOpen={this.state.addEntryModalOpen}
            onClick={this.toggleAddEntryModal}
          />
        </MapToolsOverlay>

        {
          this.state.addEntryModalOpen &&
            <AddEntryModalWrapper>
              <AddEntryModal />
            </AddEntryModalWrapper>
        }
      </MapWrapper>
    )
  }
}
