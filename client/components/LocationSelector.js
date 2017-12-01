import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import OptionSelector from './OptionSelector'
import MapMarker from './MapMarker'
import GMAP_CONFIG from '../config/google-maps'

const LocationSelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const LocationViewWrapper = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
  position: relative;
`

const PlacesDropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
`

const MapWrapper = styled.div`
  position: relative;
  z-index: 0;
  height: ${props => props.height || 300}px;
  width: 100%;
`

const PHOTO_SELECTION_MODE = { id: 'photo', text: 'From Photo' }
const CUSTOM_SELECTION_MODE = { id: 'custom', text: 'Custom' }

export default class LocationSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectModeId: props.photoCoordinates ? 'photo' : 'custom',
      searchQuery: '',
      coordinates: GMAP_CONFIG.defaultCenter,
      mapWidth: null,
    }

    this.handleSearchChange = (searchQuery) => {
      this.setState({ searchQuery })
    }
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
    this.updateMapWidth = this.updateMapWidth.bind(this)
  }

  componentDidMount() {
    this.updateMapWidth()
    window.addEventListener('resize', this.updateMapWidth)
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    if (nextProps.photoCoordinates && !this.props.photoCoordinates) {
      // If the selector just got passed photo coordiantes, switch to those
      // coordinates instead of using custom coordinates
      this.setState({ selectModeId: 'photo' })
    } else if (this.props.photoCoordinates && !nextProps.photoCoordinates) {
      // If the selector just lost its photo coordinate props, switch back to
      // custom coordinate selection
      this.setState({ selectModeId: 'custom' })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMapWidth)
  }

  decideMapCenter() {
    const { photoCoordinates } = this.props
    const { selectModeId, coordinates } = this.state
    switch (selectModeId) {
      case 'photo':
        return photoCoordinates
      case 'custom':
        return coordinates
      default:
        return null
    }
  }

  updateMapWidth() {
    // Need to manage map dimensions in state so that it can reliably be a
    // responsive square
    this.setState({ mapWidth: this.mapWrapper.clientWidth })
  }

  handlePlaceSelection(searchQuery) {
    this.setState({ searchQuery })

    // Use Google Places API to try to get the coordinates from the search query
    geocodeByAddress(searchQuery)
      .then(results => getLatLng(results[0]))
      .then(coordinates => {
        if (coordinates && coordinates.lat && coordinates.lng) {
          // this.setState({ coordinates })
          // this.props.onNewCoordinates(coordinates)
        }
      })
      .catch(error => console.log('Error', error))
  }

  handleModeChange(newModeId) {
    this.setState({ selectModeId: newModeId })
  }

  render() {
    const { photoCoordinates } = this.props
    const { selectModeId } = this.state
    const placesAutocompleteProps = {
      value: this.state.searchQuery,
      onChange: this.handleSearchChange,
      placeholder: 'Search for a location...',
    }

    const selectorOptions = [CUSTOM_SELECTION_MODE]
    if (photoCoordinates) {
      selectorOptions.push(PHOTO_SELECTION_MODE)
    }

    const mapCenter = this.decideMapCenter()

    return (
      <LocationSelectorWrapper>

        {
          selectorOptions.length > 1 &&
            <OptionSelector
              options={selectorOptions}
              selectedOptionId={selectModeId}
              onChange={this.handleModeChange}
            />
        }

        <LocationViewWrapper>
          {
            /* Only show places dropdown if user is selected a custom location */
            selectModeId === 'custom' &&
              <PlacesDropdown>
                <PlacesAutocomplete
                  inputProps={placesAutocompleteProps}
                  onSelect={this.handlePlaceSelection}
                />
              </PlacesDropdown>
          }
          <MapWrapper
            className='map-wrapper'
            innerRef={div => { this.mapWrapper = div }}
            height={this.state.mapWidth}
          >
            <GoogleMapReact
              bootstrapURLKeys={GMAP_CONFIG.bootstrapURLKeys}
              defaultCenter={GMAP_CONFIG.defaultCenter}
              center={mapCenter}
              defaultZoom={GMAP_CONFIG.defaultZoom}
            >
              {
                mapCenter &&
                  <MapMarker
                    lat={mapCenter.lat}
                    lng={mapCenter.lng}
                    name={'x'}
                  />
              }
            </GoogleMapReact>
          </MapWrapper>
        </LocationViewWrapper>
      </LocationSelectorWrapper>
    )
  }
}

LocationSelector.propTypes = {
  photoCoordinates: PropTypes.object,
  onNewCoordinates: PropTypes.func.isRequired,
}
