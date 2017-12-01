import React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import AddEntryButton from './AddEntryButton'
import AddEntryModal from './AddEntryModal'
import MapMarker from './MapMarker'
import GMAP_CONFIG, { ZOOM_LEVELS } from '../config/google-maps'
import travelEntries from '../dummy-data/travel-entries'

const MAP_PHOTO_DIMS = {
  MIN: { SIZE: 15, ZOOM: 3 }, // Image is 15x15 at zoom level <= 3
  MAX: { SIZE: 120, ZOOM: 15 }, // Image is 120x120 at zoom level >= 15
}

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
      mapCenter: null,
      mapZoom: null,
    }
    this.toggleAddEntryModal = this.toggleAddEntryModal.bind(this)
    this.zoomToMarker = this.zoomToMarker.bind(this)
    this.handleMapBoundsChange = this.handleMapBoundsChange.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  toggleAddEntryModal() {
    this.setState({ addEntryModalOpen: !this.state.addEntryModalOpen })
  }

  calculateImageSize() {
    const { mapZoom } = this.state
    const { MAX, MIN } = MAP_PHOTO_DIMS
    const SIZE_RANGE = MAX.SIZE - MIN.SIZE
    const ZOOM_RANGE = MAX.ZOOM - MIN.ZOOM
    return MIN.SIZE + (((mapZoom - MIN.ZOOM) / ZOOM_RANGE) * SIZE_RANGE)
  }

  zoomToMarker(lat, lng) {
    this.setState({ mapCenter: { lat, lng }, mapZoom: ZOOM_LEVELS.LOCAL })
  }

  handleMapBoundsChange({ center, zoom }) {
    this.setState({ mapCenter: center, mapZoom: zoom })
  }

  handleOutsideClick(event) {
    if (this.addEntryModal) {
      // NOTE: Can't use Node.contains() for this functionality because
      // Places autocomplete option divs disappear before they can be read
      // by this function so it would give false positive outside clicks
      const { x, y, width, height } = this.addEntryModal.getBoundingClientRect()
      const { clientX: clickX, clientY: clickY } = event
      if (
        clickX < x || clickX > x + width ||
        clickY < y || clickY > y + height
      ) {
        this.setState({ addEntryModalOpen: false })
      }
    }
  }

  renderTravelEntries() {
    return travelEntries.map(entry => {
      const { name, images, location } = entry
      return (
        <MapMarker
          key={name}
          name={name}
          lat={location.lat}
          lng={location.lng}
          images={images}
          size={this.calculateImageSize()}
          onClick={this.zoomToMarker.bind(this, location.lat, location.lng)}
        />
      )
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
            center={this.state.mapCenter}
            zoom={this.state.mapZoom}
            onChange={this.handleMapBoundsChange}
          >
            {this.renderTravelEntries()}
          </GoogleMapReact>
        </GoogleMapReactWrapper>

        <MapToolsOverlay>
          <AddEntryButton
            innerRef={div => { this.addEntryButton = div }}
            isOpen={this.state.addEntryModalOpen}
            onClick={this.toggleAddEntryModal}
          />
        </MapToolsOverlay>

        {
          this.state.addEntryModalOpen &&
            <AddEntryModalWrapper>
              <AddEntryModal
                innerRef={div => { this.addEntryModal = div }}
                onSubmit={() => { this.setState({ addEntryModalOpen: false }) }}
              />
            </AddEntryModalWrapper>
        }
      </MapWrapper>
    )
  }
}
