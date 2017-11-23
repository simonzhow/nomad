import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { colors } from '../constants/styles'
import LocationSelector from './LocationSelector'
import ImageChooser from './ImageChooser'

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

const FormItemDiv = styled.div`
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

const FormMapItem = FormItemDiv.extend`
  height: 100%;
`

const FormItem = (props) => {
  return (
    <FormItemDiv innerRef={props.innerRef}>
      <FormLabel>{props.name}</FormLabel>
      <div>
        {props.children}
      </div>
    </FormItemDiv>
  )
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  innerRef: PropTypes.func,
}

export default class AddEntryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      coordinates: null,
    }

    this.photoUploadInput = null
    this.handleNewCoordinates = (coordinates) => { this.setState({ coordinates }) }
    this.handleNewPhoto = (photo) => { this.setState({ photo }) }
  }

  render() {
    const { photo } = this.state

    return (
      <AddEntryModalWrapper>
        <FormTitle>Add a Travel Entry</FormTitle>

        <StyledForm>
          <FormColumn>

            <FormItem name='Name'>
              <FormInput
                type='text'
                name='name'
                placeholder='Hiked Mt. Everest'
              />
            </FormItem>

            <FormItem name='Description'>
              <FormTextArea
                name='name'
                placeholder='It only took me 3 hours!'
              />
            </FormItem>

            <FormItem name='Photo'>
              <ImageChooser onNewPhoto={this.handleNewPhoto} />
            </FormItem>

          </FormColumn>

          <FormColumn>

            <FormMapItem>
              <FormLabel>Location</FormLabel>
              <LocationSelector
                photoCoordinates={photo && photo.coordinates}
                onNewCoordinates={this.handleNewCoordinates}
              />
            </FormMapItem>

          </FormColumn>

        </StyledForm>
      </AddEntryModalWrapper>
    )
  }
}
