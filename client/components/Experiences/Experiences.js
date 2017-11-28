import React from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import yelp from 'yelp-fusion';

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const ipApi = "http://gd.geobytes.com/GetCityDetails";
const yelpApi = "https://api.yelp.com/v3/businesses/search";
const yelp_auth = 'https://api.yelp.com/oauth2/token';
const clientId = 'tNeGZND-6dRHCmE354aXLQ';
const clientSecret = 'tH5xe5c3STy2NNEBegkBX9GdaQfO7ulOqBX0txkiOU2yLWfLnJ5pqKRgA5AraFj6';
const accessToken = 'SeysEKu-QwblCdF9nn5Ym1p4Zz7YLfIAbrL8jrUmWub36GO_TUrDVlqps9VRHIeeS4x1ax2zrMSvG64RN2yFtYtez7XAxce1DrPozuXFeAagrl5LT1sLss6sF-IcWnYx';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 34.0522,
      longitude: -118.2437,
      city: 'Los Angeles',
      experiences: []
    }
    this.getLocationFromIP = this.getLocationFromIP.bind(this);
    this.getYelpEntries = this.getYelpEntries.bind(this);
  }

  componentWillMount(){
    this.getLocationFromIP();
    this.getYelpEntries();
  }

  componentDidMount(){
    
  }

  getLocationFromIP() {
    fetch(proxyurl + ipApi)
    .then(res => res.json())
    .then((out) => {
      this.setState({
        latitude: out.geobyteslatitude,
        longitude: out.geobyteslongitude,
        city: out.geobytescity
      })
      console.log(this.state);
  })
    .catch(err => { throw err });
  }

  getYelpEntries(){ 
    let requestParams = {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }

    let querystring = '?latitude='+parseFloat(this.state.latitude)+
    '&longitude='+parseFloat(this.state.longitude)+'&categories=active,all&radius=5000';
    fetch(proxyurl + yelpApi + querystring, requestParams).then(res => res.json())
    .then((out) => {
      console.log(out);
      this.setState({
        experiences: out.businesses
      })
    })
    .catch(err => { throw err });
  }

  getExperiencesMarkup(){
    const experienceList = this.state.experiences.map(function(exp){
      return (<div>{exp.name}</div>)
    });
    return experienceList;
  }

  render() {
    let experiencesMarkup = this.getExperiencesMarkup();
    return (
      <div>{experiencesMarkup}</div>
    )
  }
}
