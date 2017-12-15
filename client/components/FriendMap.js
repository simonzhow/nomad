import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import { connect } from 'react-redux'
import MapMarker from './MapMarker'
import GMAP_CONFIG from '../config/google-maps'
import { GET_TRAVEL_ENTRIES } from '../constants/api-endpoints'
import { colors } from '../constants/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Text = styled.h2`
  font-size: 24px;
  color: ${colors.green};
`

const Subtitle = styled.p`
  font-size: 14px;
  color: ${colors.gray};
`

const MapWrapper = styled.div`
  height: 350px;
  width: 100%;
  padding: 10px 0px;
`

class FriendMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      travelEntries: null,
    }
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: [GET_TRAVEL_ENTRIES, this.props.friend.user_id].join('/'),
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
      .then(({ data }) => {
        this.setState({ travelEntries: data.travelEntries })
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }

  renderTravelEntries() {
    return this.state.travelEntries &&
      this.state.travelEntries.map(entry => {
        const { travel_id, photo_url: image, location } = entry
        return (
          <MapMarker
            key={travel_id}
            lat={location.lat}
            lng={location.lng}
            images={[image].filter(Boolean)}
            size={50}
          />
        )
      })
  }

  render() {
    const firstName = this.props.friend.first_name
    return (
      <Container>
        <Text>{`${firstName}'s Adventures`}</Text>
        {this.state.travelEntries && this.state.travelEntries.length === 0 &&
          <Subtitle>{`${firstName} doesn't seem to have any travel entries... go be a Nomad with them!`}</Subtitle>
        }
        <MapWrapper>
          <GoogleMapReact
            bootstrapURLKeys={GMAP_CONFIG.bootstrapURLKeys}
            defaultCenter={GMAP_CONFIG.defaultCenter}
            defaultZoom={GMAP_CONFIG.defaultZoom}
            center={this.state.mapCenter}
            zoom={this.state.mapZoom}
          >
            {this.renderTravelEntries()}
          </GoogleMapReact>
        </MapWrapper>
      </Container>
    )
  }
}

FriendMap.propTypes = {
  friend: PropTypes.object.isRequired,
  accessToken: PropTypes.string,
}

const mapStateToProps = state => ({
  accessToken: state.auth.accessToken,
})

export default connect(mapStateToProps, {})(FriendMap)
