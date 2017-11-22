import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import GMAP_CONFIG from '../config/google-maps'

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
  height: 100%;
  width: 100%;
`

const DEFAULT_COORDINATES = { lat: 47.44642, lng: -122.29949 }

export default class LocationSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchQuery: '',
      coordinates: DEFAULT_COORDINATES,
    }

    this.handleSearchChange = (searchQuery) => {
      this.setState({ searchQuery })
    }
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
  }

  handlePlaceSelection(searchQuery) {
    geocodeByAddress(searchQuery)
      .then(results => getLatLng(results[0]))
      .then(coordinates => {
        if (coordinates && coordinates.lat && coordinates.lng) {
          this.setState({ coordinates })
          this.props.onNewCoordinates(coordinates)
        }
      })
      .catch(error => console.log('Error', error))
  }

  render() {
    const placesAutocompleteProps = {
      value: this.state.searchQuery,
      onChange: this.handleSearchChange,
    }

    return (
      <LocationViewWrapper>
        <PlacesDropdown>
          <PlacesAutocomplete
            inputProps={placesAutocompleteProps}
            onSelect={this.handlePlaceSelection}
          />
        </PlacesDropdown>
        <MapWrapper>
          <GoogleMapReact
            bootstrapURLKeys={GMAP_CONFIG.bootstrapURLKeys}
            defaultCenter={GMAP_CONFIG.defaultCenter}
            center={this.state.coordinates}
            defaultZoom={GMAP_CONFIG.defaultZoom}
          />
        </MapWrapper>
      </LocationViewWrapper>
    )
  }
}

LocationSelector.propTypes = {
  onNewCoordinates: PropTypes.func.isRequired,
}
