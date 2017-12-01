import React from 'react'
import styled from 'styled-components'
import { colors, shadows } from '../../constants/styles'

const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const ipApi = 'http://gd.geobytes.com/GetCityDetails'
const yelpApi = 'https://api.yelp.com/v3/businesses/search'
// const yelp_auth = 'https://api.yelp.com/oauth2/token'
// const clientId = 'tNeGZND-6dRHCmE354aXLQ'
// const clientSecret = 'tH5xe5c3STy2NNEBegkBX9GdaQfO7ulOqBX0txkiOU2yLWfLnJ5pqKRgA5AraFj6'
const accessToken = 'SeysEKu-QwblCdF9nn5Ym1p4Zz7YLfIAbrL8jrUmWub36GO_TUrDVlqps9VRHIeeS4x1ax2zrMSvG64RN2yFtYtez7XAxce1DrPozuXFeAagrl5LT1sLss6sF-IcWnYx'

const Wrapper = styled.section`
  padding: 4em;
  overflow-y: scroll;
`

const Title = styled.h1`
  font-size: 1.3em;
  text-align: center;
  color: ${colors.violetRed};
`

const ExperiencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`

const ExperienceDiv = styled.div`
  border-radius: 2px;
  width: 250px;
  height: 100px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  margin: 10px;
  outline: 0;
  font-size: .9em;
  box-shadow: ${shadows.cardshadow};
  transition: all 200ms ease-in;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
`

export default class Experiences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      latitude: 34.0522,
      longitude: -118.2437,
      city: 'Los Angeles',
      experiences: [],
    }
    this.getLocationFromIP = this.getLocationFromIP.bind(this)
    this.getYelpEntries = this.getYelpEntries.bind(this)
  }

  componentWillMount() {
    this.getLocationFromIP()
    this.getYelpEntries()
  }

  componentDidMount() {

  }

  getLocationFromIP() {
    fetch(proxyurl + ipApi)
      .then(res => res.json())
      .then((out) => {
        this.setState({
          latitude: out.geobyteslatitude,
          longitude: out.geobyteslongitude,
          city: out.geobytescity,
        })
        // console.log(this.state)
      })
      .catch((err) => { throw err })
  }

  getYelpEntries() {
    const requestParams = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const querystring = `?latitude=${parseFloat(this.state.latitude)
    }&longitude=${parseFloat(this.state.longitude)}&categories=active,all&radius=5000`
    fetch(proxyurl + yelpApi + querystring, requestParams).then(res => res.json())
      .then((out) => {
        // console.log(out)
        this.setState({
          experiences: out.businesses,
        })
      })
      .catch((err) => { throw err })
  }

  getExperiencesMarkup() {
    const experienceList = this.state.experiences.map((exp) => {
      return (<ExperienceDiv>{exp.name}</ExperienceDiv>)
    })
    return experienceList
  }

  getLocationMarkup() {
    return (<Title>Experiences near your current location,&nbsp;
      {this.state.city}&nbsp;({this.state.latitude}, {this.state.longitude})
            </Title>)
  }

  render() {
    const experiencesMarkup = this.getExperiencesMarkup()
    const locationMarkup = this.getLocationMarkup()
    return (
      <Wrapper>
        {locationMarkup}
        <ExperiencesContainer>{experiencesMarkup}</ExperiencesContainer>
      </Wrapper>
    )
  }
}
