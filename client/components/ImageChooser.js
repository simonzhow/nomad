import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from './Button'
import { dmsToDecimal } from '../util/map-helpers'
import { orientationKeyToCSSTransform } from '../util/exif-helpers'
import { colors } from '../constants/styles'
import EXIF from 'exif-js'

const HiddenInput = styled.input`
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
`

const PhotoPreviewDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  overflow: hidden;
`
const PhotoPreviewImg = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  margin-right: 4px;
  ${props => { return props.orientation ? `transform: ${props.orientation};` : '' }}
`

const PhotoUploadDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
`

const Caption = styled.p`
  font-size: 9px;
  line-height: 14px;
  color: ${colors.gray};
  margin: 4px 0px;
`

const PhotoPreviewText = Caption.extend`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ChooseFileButton = Button.extend`
  flex-shrink: 0;
`

const NO_GEODATA_MESSAGE = 'Your photo doesn\'t seem to have any location data. Try entering a custom location.'

export default class ImageChooser extends React.Component {

  static propTypes = {
    onNewPhoto: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      photo: null,
    }
    this.handleNewFileInput = this.handleNewFileInput.bind(this)
    this.triggerPhotoUploadDialog = this.triggerPhotoUploadDialog.bind(this)
  }

  handleNewFileInput() {
    const file = this.photoUploadInput.files[0]
    const photo = {
      file,
      dataURL: null,
      orientation: null,
      coordinates: null,
    }
    const reader = new FileReader()
    const component = this

    // When the file reader finishes reading the selected file
    reader.onload = () => {
      // Create a hidden img tag on the document (required in order to use the
      // exif-js library to parse it for metadata
      const img = document.createElement('img')
      photo.dataURL = reader.result
      img.src = reader.result
      img.hidden = true

      // Set a callback for when the image finishes loading on the page
      // Callback will try to extract coordinates from image metadata
      img.onload = function () {
        EXIF.getData(this, function () {
          const latExif = {
            value: EXIF.getTag(this, 'GPSLatitude'),
            dir: EXIF.getTag(this, 'GPSLatitudeRef'),
          }
          const lngExif = {
            value: EXIF.getTag(this, 'GPSLongitude'),
            dir: EXIF.getTag(this, 'GPSLongitudeRef'),
          }

          const orientationExif = EXIF.getTag(this, 'Orientation')
          photo.orientation = orientationKeyToCSSTransform[orientationExif]

          // If coordinates exist, update photo object
          if (latExif.value && latExif.dir && lngExif.value && lngExif.dir) {
            const absLat = dmsToDecimal(latExif.value.map(val => val.valueOf()))
            const lat = latExif.dir.toLowerCase() === 's' ? -absLat : absLat
            const absLng = dmsToDecimal(lngExif.value.map(val => val.valueOf()))
            const lng = lngExif.dir.toLowerCase() === 'w' ? -absLng : absLng

            if (lat && lng) {
              photo.coordinates = { lat, lng }
            }
          }

          // Update state with photo object
          component.setState({ photo })
          component.props.onNewPhoto(photo)

          // Remove image from DOM since we're done parsing it for coordinates
          document.body.removeChild(img)
        })
      }

      // Add image onto DOM so that exif-js can properly parse it
      document.body.appendChild(img)
    }

    reader.readAsDataURL(file)
  }

  triggerPhotoUploadDialog() {
    if (this.photoUploadInput) {
      this.photoUploadInput.click()
    }
  }

  render() {
    const { photo } = this.state

    return (
      <div>
        <HiddenInput
          innerRef={input => { this.photoUploadInput = input }}
          onChange={this.handleNewFileInput}
          type='file'
        />
        <PhotoUploadDiv>
          <ChooseFileButton onClick={this.triggerPhotoUploadDialog}>
            Choose File
          </ChooseFileButton>
          {
            photo &&
              <PhotoPreviewDiv>
                <PhotoPreviewImg
                  src={photo.dataURL}
                  orientation={photo.orientation}
                />
                <PhotoPreviewText>{photo.file && photo.file.name}</PhotoPreviewText>
              </PhotoPreviewDiv>
          }
        </PhotoUploadDiv>
        {
          photo && !photo.coordinates &&
            <Caption>{NO_GEODATA_MESSAGE}</Caption>
        }
      </div>
    )
  }
}
