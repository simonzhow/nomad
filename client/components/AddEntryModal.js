import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import { colors } from '../constants/styles'
import Spinner from './Spinner'
import Button from './Button'
import LocationSelector from './LocationSelector'
import ImageChooser from './ImageChooser'
import { ADD_TRAVEL_ENTRY } from '../constants/api-endpoints'

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 50%;
  padding: 20px;
`

const FormTitle = styled.div`
  color: ${colors.green};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const FormItemDiv = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: ${props => { return props.grow ? 1 : 0 }};
`

const FormItemInnerDiv = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const FormLabel = styled.div`
  color: ${colors.black};
  font-size: 16px;
  margin-bottom: 5px;
  ${props => (props.required && `
    :after {
      content: '*';
      color: red;
    }
  `)}
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
  flex-grow: 1;
`

const FormNote = styled.p`
  font-style: italic;
  font-size: 9px;
  line-height: 14px;
  color: ${colors.gray};
  margin: 4px 0px;
`

const FormItem = (props) => {
  return (
    <FormItemDiv innerRef={props.innerRef} grow={props.grow}>
      <FormLabel required={props.required}>{props.name}</FormLabel>
      <FormItemInnerDiv>
        {props.children}
      </FormItemInnerDiv>
    </FormItemDiv>
  )
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  grow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  innerRef: PropTypes.func,
}

const LOCATION_FROM_PHOTO_MESSAGE = 'We\'ll try our best to grab the location data from a photo if you provide one!'

class AddEntryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      photo: null,
      coordinates: null,
      submitting: false,
    }

    this.photoUploadInput = null
    this.handleTitleChange = (evt) => { this.setState({ title: evt.target.value }) }
    this.handleDescriptionChange = (evt) => { this.setState({ description: evt.target.value }) }
    this.handleNewPhoto = this.handleNewPhoto.bind(this)
    this.handleNewCoordinates = (coordinates) => { this.setState({ coordinates }) }
    this.submit = this.submit.bind(this)
  }

  isReadyToSubmit() {
    const { title, description, coordinates } = this.state
    return Boolean(title && description && coordinates)
  }

  handleNewPhoto(photo) {
    this.setState({ photo })
    if (photo.coordinates) {
      this.setState({ coordinates: photo.coordinates })
    }
  }

  submit() {
    const { title, description, photo, coordinates: location } = this.state
    const formData = new FormData()
    if (photo && photo.file) {
      formData.append('photo', photo.file)
    }
    formData.append('title', title)
    formData.append('description', description)
    formData.append('location', JSON.stringify(location))
    if (this.props.accessToken && this.isReadyToSubmit()) {
      this.setState({ submitting: true })
      axios({
        method: 'post',
        url: ADD_TRAVEL_ENTRY,
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`,
        },
        data: formData,
      })
        .then(() => {
          this.props.onSubmit()
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }
  }

  render() {
    const { photo } = this.state

    return (
      <AddEntryModalWrapper innerRef={this.props.innerRef}>
        <FormTitle>Add a Travel Entry</FormTitle>

        <StyledForm>
          <ColumnsWrapper>
            <FormColumn>

              <FormItem name='Title' required>
                <FormInput
                  onChange={this.handleTitleChange}
                  type='text'
                  name='title'
                  placeholder='Hiked Mt. Everest'
                />
              </FormItem>

              <FormItem name='Description' required grow>
                <FormTextArea
                  onChange={this.handleDescriptionChange}
                  name='description'
                  placeholder='It only took me 3 hours!'
                />
              </FormItem>

              <FormItem name='Photo'>
                <ImageChooser onNewPhoto={this.handleNewPhoto} />
              </FormItem>

            </FormColumn>

            <FormColumn>

              <FormItem name='Location' required>
                <FormNote>{LOCATION_FROM_PHOTO_MESSAGE}</FormNote>
                <LocationSelector
                  photoCoordinates={photo && photo.coordinates}
                  onNewCoordinates={this.handleNewCoordinates}
                />
              </FormItem>

            </FormColumn>
          </ColumnsWrapper>

          {
            this.state.submitting ?
              <Spinner /> :
              <Button
                disabled={!this.isReadyToSubmit()}
                onClick={this.submit}
              >
                Submit
              </Button>
          }

        </StyledForm>
      </AddEntryModalWrapper>
    )
  }
}

AddEntryModal.propTypes = {
  accessToken: PropTypes.string,
  onSubmit: PropTypes.func,
  innerRef: PropTypes.func,
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
})

export default connect(mapStateToProps, {})(AddEntryModal)
