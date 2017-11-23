import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import OptionSelector from './OptionSelector'
import GMAP_CONFIG from '../config/google-maps'

const LocationSelectorWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  height: 100%;
  width: 100%;
`

export default class LocationSelector extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectModeId: props.photoCoordinates ? 'photo' : 'custom',
      searchQuery: '',
      coordinates: GMAP_CONFIG.defaultCenter,
    }

    this.modes = [
      { id: 'photo', text: 'From Photo' },
      { id: 'custom', text: 'Custom' },
    ]

    this.handleSearchChange = (searchQuery) => {
      this.setState({ searchQuery })
    }
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
  }

  handlePlaceSelection(searchQuery) {
    this.setState({ searchQuery })
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

  handleModeChange(newModeId) {
    this.setState({ selectModeId: newModeId })
  }

  render() {
    const placesAutocompleteProps = {
      value: this.state.searchQuery,
      onChange: this.handleSearchChange,
      placeholder: 'Search for a location...',
    }

    return (
      <LocationSelectorWrapper>

        <OptionSelector
          options={this.modes}
          selectedOptionId={this.state.selectModeId}
          onChange={this.handleModeChange}
        />

        <LocationViewWrapper>
          {
            /* Only show places dropdown if user is selected a custom location */
            this.state.selectModeId === 'custom' &&
              <PlacesDropdown>
                <PlacesAutocomplete
                  inputProps={placesAutocompleteProps}
                  onSelect={this.handlePlaceSelection}
                />
              </PlacesDropdown>
          }
          <MapWrapper>
            <GoogleMapReact
              bootstrapURLKeys={GMAP_CONFIG.bootstrapURLKeys}
              defaultCenter={GMAP_CONFIG.defaultCenter}
              center={this.state.coordinates}
              defaultZoom={GMAP_CONFIG.defaultZoom}
            />
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
