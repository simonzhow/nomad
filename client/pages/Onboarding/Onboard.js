import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import axios from 'axios'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import Script from 'react-load-script'
import bg from '../../static/img/onboard_bg.jpg'
import GMAP_CONFIG from '../../config/google-maps'
import { COMPLETE_ONBOARDING } from '../../constants/api-endpoints'
import * as actions from '../../actions'

const OnboardDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: url(${bg});
  background-size: cover;
`

const PlacesDropdown = styled.div`
  position: relative;
  z-index: 1;
  top: 0;
  left: 0;
  width: 40%;
  margin-top: 1em;
`

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`

const googleMapsApi = `https://maps.googleapis.com/maps/api/js?key=${GMAP_CONFIG.bootstrapURLKeys.key}&libraries=places`

class OnboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searchQuery: '', scriptLoaded: false }
    this.handleSearchChange = (searchQuery) => {
      this.setState({ searchQuery })
    }
    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleScriptLoad = this.handleScriptLoad.bind(this)
  }

  componentDidMount() {
    this.catchAlreadyOnboardedUsers()
  }

  componentDidUpdate() {
    this.catchAlreadyOnboardedUsers()
  }

  catchAlreadyOnboardedUsers() {
    if (this.props.user && this.props.user.home) {
      this.props.history.replace('/map')
    }
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }

  handlePlaceSelection(searchQuery) {
    this.setState({ searchQuery })

    // Use Google Places API to try to get the coordinates from the search query
    geocodeByAddress(searchQuery)
      .then(results => getLatLng(results[0]))
      .then((res) => {
        axios({
          method: 'post',
          url: COMPLETE_ONBOARDING,
          headers: {
            Authorization: `Bearer ${this.props.accessToken}`,
          },
          data: {
            home: { lat: res.lat, lng: res.lng },
          },
        })
          .then((postRes) => {
            this.props.updateUser(postRes.data.user)
          })
          .catch(err => {
            // eslint-disable-next-line
            console.log(err)
          })
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error', error)
      })
  }
  render() {
    const placesAutocompleteProps = {
      value: this.state.searchQuery,
      onChange: this.handleSearchChange,
      placeholder: 'Search for a location...',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    )

    let placesDropdown = ''
    if (this.state.scriptLoaded) {
      placesDropdown = (
        <PlacesDropdown>
          <PlacesAutocomplete
            inputProps={placesAutocompleteProps}
            onSelect={this.handlePlaceSelection}
            autocompleteItem={AutocompleteItem}
          />
        </PlacesDropdown>
      )
    }
    return (this.props.user && !this.props.user.home &&
      <OnboardDiv>
        <Script
          url={googleMapsApi}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Title>WHERE IS HOME?</Title>
        {placesDropdown}
      </OnboardDiv>
    )
  }
}

OnboardPage.propTypes = {
  accessToken: PropTypes.string,
  updateUser: PropTypes.func,
  user: PropTypes.object,
  history: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.user,
  accessToken: state.auth.accessToken,
})

export default connect(mapStateToProps, actions)(withRouter(OnboardPage))
