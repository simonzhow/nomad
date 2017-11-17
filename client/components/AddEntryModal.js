import React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/styles'

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
`

const FormTextArea = styled.textarea`
  padding: 6px;
  margin: 3px 0px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid ${colors.lightGray};
  width: 400px;
  height: 100px;
`

export default class AddEntryModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <AddEntryModalWrapper>
        <FormTitle>Add a Travel Entry</FormTitle>

        <form>
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
        </form>
      </AddEntryModalWrapper>
    )
  }
}
