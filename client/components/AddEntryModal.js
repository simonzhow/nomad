import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/styles'
import Button from './Button'
import LocationSelector from './LocationSelector'

const AddEntryModalWrapper = styled.div`
  background-color: ${colors.white};
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
      coordinates: null,
    }

    this.photoUploadInput = null
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.triggerPhotoUploadDialog = this.triggerPhotoUploadDialog.bind(this)
  }

  handleLocationChange(newCoordinates) {
    this.setState({ coordinates: newCoordinates })
  }

  triggerPhotoUploadDialog() {
    if (this.photoUploadInput) {
      this.photoUploadInput.click()
    }
  }

  render() {
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
