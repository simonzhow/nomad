import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import mapMarkerIcon from '../static/img/map-marker.png'
import { shadows } from '../constants/styles'

const MapMarkerWrapper = styled.div`
  position: relative;
`

const MapPhotoWrapper = styled.div`
  cursor: pointer;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 1px;
  border: ${props => props.size * 0.05}px solid white;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  &:hover {
    transform: translate(-50%, -50%) scale(1.5);
    box-shadow: ${shadows.default};
  }
`

const MapMarkerImage = styled.img`
  width: 35px;
  height: 35px;
  transform: translate(-50%, -100%);
  cursor: pointer;
`

export default class MapMarker extends React.Component {

  static propTypes = {
    images: PropTypes.array,
    onClick: PropTypes.func,
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 120,
  }

  constructor(props) {
    super(props)
    this.state = {
      tooltipOpen: false,
    }
    this.handleMarkerClick = this.handleMarkerClick.bind(this)
  }

  handleMarkerClick() {
    this.props.onClick()
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  render() {
    const { images, size } = this.props

    return (
      <MapMarkerWrapper onClick={this.handleMarkerClick}>
        {
          (images && Array.isArray(images) && images.length > 0) ?
            <MapPhotoWrapper
              src={images[0]}
              size={size}
            /> :
            <MapMarkerImage
              src={mapMarkerIcon}
            />
        }
      </MapMarkerWrapper>
    )
  }
}
