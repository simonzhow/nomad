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
  color: ${colors.blue};
  font-size: 24px;
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
  height: 100px;
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


export default class AddEntryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onLocationChange = newCoordinates => {
      console.log(`a: ${newCoordinates.lat}, ${newCoordinates.lng}`)
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
              <FormLabel>Photo(s)</FormLabel>
              <Button
                onClick={() => { alert('Upload dialog coming soon') }}
              >
                Choose File(s)
              </Button>
            </FormItem>
          </FormColumn>
          <FormColumn>
            <FormMapItem>
              <FormLabel>Location</FormLabel>
              <LocationSelector
                onNewCoordinates={this.onLocationChange}
              />
            </FormMapItem>
          </FormColumn>
        </StyledForm>
      </AddEntryModalWrapper>
    )
  }
}
