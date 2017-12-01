import React from 'react'
import styled, { keyframes } from 'styled-components'
import StarRatings from 'react-star-ratings'
import Dropdown from 'react-dropdown'
import axios from 'axios'
import { colors, shadows } from '../../constants/styles'
import { proxyurl, ipApi, yelpApi, accessToken } from '../../config/yelp-config'

const Wrapper = styled.section`
  padding: 4em;
  overflow-y: scroll;
`

const Title = styled.h1`
  font-size: 1.3em;
  color: ${colors.black};
`

const Selector = styled.h1`
  font-size: 1.3em;
  color: ${colors.violetRed};
  cursor: pointer;
`

const ExperiencesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`

const ExperienceTitle = styled.h1`
  font-size: 1em;
  text-align: center;
  margin: 10px 0px;
  color: ${colors.black};
`

const ExperienceCategory = styled.button`
  background: ${colors.violetRed};
  color: ${colors.white};
  font-size: .8em;
  text-align: center;
  height: 30px;
  min-width: 40px;
  margin: 0em .5em 0em .5em;
  padding: 0.25em 1em;
  border-radius: 15px;
  border: solid 1px ${colors.violetRed};
`

const ExperienceCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
`

const ExperiencePhoto = styled.div`
  background: url(${props => props.backgroundImage});
  width: 100%;
  height: 200px;
  background-size: cover
  `

const animateIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
}`

const ExperienceDiv = styled.div`
  border-radius: 10px;
  width: 250px;
  height: 330px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  margin: 10px;
  outline: 0;
  font-size: .9em;
  box-shadow: ${shadows.cardshadow};
  transition: all 200ms ease-in;
  position: relative;
  cursor: pointer;
  animation: ${animateIn} .8s ease-in;
  &:hover {
    transform: scale(1.05);
  }
`

const options = [
  { value: 'active', label: 'Active Experiences' },
  { value: 'tours', label: 'Tours' },
  { value: 'food', label: 'Food' },
  { value: 'galleries', label: 'Art' },
]

const categories = {
  active: 'Active Experiences',
  tours: 'Tours',
  food: 'Food',
  galleries: 'Art',
}

const defaultCategory = 'active'

export default class Experiences extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      experiences: [],
    }
    this.getLocationFromIP = this.getLocationFromIP.bind(this)
    this.getYelpEntries = this.getYelpEntries.bind(this)
    this.selectExperienceCategory = this.selectExperienceCategory.bind(this)
    this.selectExperienceCategory = this.selectExperienceCategory.bind(this)
    this.getLocationFromIP()
  }

  getLocationFromIP() {
    axios(proxyurl + ipApi)
      .then(({ data }) => {
        this.setState({
          latitude: data.geobyteslatitude,
          longitude: data.geobyteslongitude,
          city: data.geobytescity,
        })
        // This function is used as callback, because we need coordinates before calling it.
        this.getYelpEntries(defaultCategory)
      })
      .catch((err) => { throw err })
  }

  getYelpEntries(category) {
    const { latitude, longitude } = this.state
    axios({
      method: 'get',
      url: proxyurl + yelpApi,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        categories: `${category},all`,
        radius: 5000,
      },
    })
      .then(({ data }) => {
        this.setState({
          experiences: data.businesses,
          category: categories[category],
        })
      })
      .catch((err) => { throw err })
  }

  getExperiencesMarkup() {
    const experienceList = this.state.experiences.map((exp) => {
      const categoryLabels = exp.categories.map((category, i) => {
        if (i >= 2) return null
        return (
          <ExperienceCategory key={category.title}>
            {category.title}
          </ExperienceCategory>
        )
      })
      return (
        <a href={exp.url} target='_blank' style={{ textDecoration: 'none' }} key={exp.url}>
          <ExperienceDiv>
            <ExperiencePhoto backgroundImage={exp.image_url} />
            <ExperienceTitle>{exp.name}</ExperienceTitle>
            <StarRatings
              rating={exp.rating}
              isSelectable={false}
              isAggregateRating
              numOfStars={5}
              starRatedColor={'orange'}
              starWidthAndHeight={'15px'}
            />
            <ExperienceCategoryContainer>{categoryLabels}</ExperienceCategoryContainer>
          </ExperienceDiv>
        </a>)
    })
    return experienceList
  }

  getLocationMarkup() {
    return (<Title>
      near your current location,&nbsp;
      {this.state.city}&nbsp;({this.state.latitude}, {this.state.longitude})
    </Title>)
  }

  selectExperienceCategory(option) {
    this.getYelpEntries(option.value)
  }


  render() {
    const experiencesMarkup = this.getExperiencesMarkup()
    const locationMarkup = this.getLocationMarkup()
    return (
      <Wrapper>
        <Selector><i><Dropdown options={options} onChange={this.selectExperienceCategory} value={this.state.category} placeholder='Select an experience category' /></i></Selector>
        {locationMarkup}
        <ExperiencesContainer>{experiencesMarkup}</ExperiencesContainer>
      </Wrapper>
    )
  }
}
