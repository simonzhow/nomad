import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../constants/styles'
import Button from './Button'
import LocationSelector from './LocationSelector'
import { dmsToDecimal } from '../util/geo-helpers'
import EXIF from 'exif-js'

const growIn = keyframes`
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const AddEntryModalWrapper = styled.div`
  position: relative;
  background-color: ${colors.white};
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  animation: ${growIn} 0.5s ease;
`

const FormTitle = styled.div`
  color: ${colors.green};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const FormItem = styled.div`
  margin-bottom: 10px;
  width: 100%;
`

const FormLabel = styled.div`
  color: ${colors.black};
  font-size: 16px;
  margin-bottom: 5px;
`

const FormInput = styled.input`
  padding: 6px;
  margin: 3px 0px;
  border-radius: 2px;
  border: 1px solid ${colors.lightGray};
  font-size: 14px;
  width: 100%;
`

const FormTextArea = styled.textarea`
  padding: 6px;
  margin: 3px 0px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid ${colors.lightGray};
  width: 100%;
  height: 180px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
`

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  padding: 20px;
`

const FormMapItem = FormItem.extend`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const HiddenInput = styled.input`
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
`

const FormNote = styled.p`
  font-style: italic;
  font-size: 11px;
  line-height: 14px;
  color: ${colors.gray};
  margin: 4px 0px;
`

const POINTS_WARNING_TEXT = '** You can only earn points if you use the location from a photo.'

export default class AddEntryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      coordinates: null,
    }

    this.photoUploadInput = null
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleNewFileInput = this.handleNewFileInput.bind(this)
    this.triggerPhotoUploadDialog = this.triggerPhotoUploadDialog.bind(this)
  }

  handleLocationChange(newCoordinates) {
    this.setState({ coordinates: newCoordinates })
  }

  handleNewFileInput() {
    const file = this.photoUploadInput.files[0]
    const reader = new FileReader()
    const component = this

    // When the file reader finishes reading the selected file
    reader.onload = () => {
      // Create a hidden img tag on the document (required in order to use the
      // exif-js library to parse it for metadata
      const img = document.createElement('img')
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

          // Initialize photo object to update component state with
          const photo = { coordinates: null }
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
      <AddEntryModalWrapper>
        <FormTitle>Add a Travel Entry</FormTitle>

        <StyledForm>
          <FormColumn>

            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormInput
                type='text'
                name='name'
                placeholder='Hiked Mt. Everest'
              />
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                name='name'
                placeholder='It only took me 3 hours!'
              />
            </FormItem>

            <FormItem>
              <FormLabel>Photo</FormLabel>
              <HiddenInput
                innerRef={input => { this.photoUploadInput = input }}
                onChange={this.handleNewFileInput}
                type='file'
              />
              <Button
                onClick={this.triggerPhotoUploadDialog}
              >
                Choose File
              </Button>
            </FormItem>

          </FormColumn>

          <FormColumn>

            <FormMapItem>
              <FormLabel>Location</FormLabel>
              <LocationSelector
                overrideCoordinates={photo && photo.coordinates}
                onNewCoordinates={this.handleLocationChange}
              />
              <FormNote>{POINTS_WARNING_TEXT}</FormNote>
            </FormMapItem>

          </FormColumn>

        </StyledForm>
      </AddEntryModalWrapper>
    )
  }
}
