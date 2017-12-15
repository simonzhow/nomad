import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import axios from 'axios'
import { colors } from '../constants/styles'
import CloseIcon from './CloseIcon'
import * as actions from '../actions'
import { DELETE_TRAVEL_ENTRY } from '../constants/api-endpoints'

const SelectedEntryView = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: white;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.5);
  padding: 15px;
  width: 400px;
  height: 200px;
`

const ImageCarousel = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  & > * {
    height: 100%;
    padding: 5px;
  }

  overflow-x: auto;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    height: 3px;
  	background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  	background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
  	background-color: ${colors.green};
  }
`

const TitleText = styled.h1`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.black};
  margin-bottom: 8px;
`

const DescriptionText = styled.p`
  font-size: 14px;
  color: ${colors.gray};
`
const PointsIndicator = styled.div`
  background-color:  ${colors.green};
  color: ${colors.white};
  padding: 8px;
  font-size: 12px;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  top: 0px;
  right: 40px;
  transform: translate(50%, -50%);
`

const EntryImage = styled.img`
  height: 100%;
  border-radius: 5px;
`


const CloseButtonWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  cursor: pointer;
`

const DeleteText = styled.div`
  text-decoration: underline;
  color: ${colors.red};
  cursor: pointer;
`

function MapMarkerDetailedView(props) {
  const { title, description, photo_url, points } = props.entry

  const deleteTravelEntry = () => {
    const { travel_id } = props.entry
    axios({
      method: 'delete',
      url: [DELETE_TRAVEL_ENTRY, travel_id].join('/'),
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    })
      .then(() => {
        // eslint-disable-next-line no-console
        props.closeView()
        props.getUserAsync()
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log(err)
      })
  }

  return (
    <SelectedEntryView>
      <CloseButtonWrapper onClick={props.closeView}><CloseIcon /></CloseButtonWrapper>
      <PointsIndicator>{`+${Math.floor(points)}`}</PointsIndicator>
      <TitleText>{title}</TitleText>
      <DescriptionText>{description}</DescriptionText>
      <ImageCarousel>
        {photo_url && <div><EntryImage alt={title} src={photo_url} /></div>}
      </ImageCarousel>
      <DeleteText onClick={deleteTravelEntry} >Delete</DeleteText>
    </SelectedEntryView>
  )
}

MapMarkerDetailedView.propTypes = {
  entry: PropTypes.object.isRequired,
  closeView: PropTypes.func,
  accessToken: PropTypes.string,
  getUserAsync: PropTypes.func,
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
})

export default connect(mapStateToProps, actions)(MapMarkerDetailedView)
