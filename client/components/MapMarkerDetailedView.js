import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../constants/styles'

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

const EntryImage = styled.img`
  height: 100%;
  border-radius: 5px;
`

export default function MapMarkerDetailedView(props) {
  const { name, description, location, images } = props.entry
  return (
    <SelectedEntryView>
      <h4>{name}</h4>
      <p>{`${location.lat}, ${location.lng}`}</p>
      <p>{description}</p>
      <ImageCarousel>
        {images.map(image => (
          <div key={image}>
            <EntryImage alt='whatever' src={image} />
          </div>
        ))}
      </ImageCarousel>
    </SelectedEntryView>
  )
}

MapMarkerDetailedView.propTypes = {
  entry: PropTypes.object.isRequired,
}
