import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './Landing.css';
import logo from '../static/img/nomad_logo.png';

let silhouette = [
	require('../static/img/silhouette1.jpg'),
	require('../static/img/silhouette2.jpg'),
	require('../static/img/silhouette3.jpg'),
	require('../static/img/silhouette4.jpg'),
	require('../static/img/silhouette5.jpg'),
	require('../static/img/silhouette6.jpg'),
	require('../static/img/silhouette7.jpg'),
	require('../static/img/silhouette8.jpg'),
	require('../static/img/silhouette9.jpg'),
];

export class Landing extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			imgcount: 0
		};
	}

	componentDidMount() {
	  this.interval = setInterval(() => this.setState({ 
	  	time: Date.now(), imgcount: this.state.imgcount == 2 ? 0 : this.state.imgcount+1 
	  }), 4000);
	}

	componentWillUnmount() {
	  clearInterval(this.interval);
	}

	getBackgroundStyle(offset){
		let backgroundStyle = {
			backgroundImage: 'url(' + silhouette[offset+this.state.imgcount] + ')',
			backgroundSize: 'cover'
		}
		return backgroundStyle;
	}

	render() {
		return (
			<div className={styles.container}>
				<img className={styles.landingLogo} src={logo}/>
				<div className={styles.splashContainer}>
					<div className={styles.splashcard} style={this.getBackgroundStyle(0)}></div>
					<div className={styles.splashcard} style={this.getBackgroundStyle(3)}></div>
					<div className={styles.splashcard} style={this.getBackgroundStyle(6)}></div>	
				</div>
			</div>
			)
	}
}

export default Landing;