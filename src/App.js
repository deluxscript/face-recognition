import React, { Component } from 'react';
import './App.css';
import  Account from './components/Account/Account';
import  AppLogo from './components/AppLogo/AppLogo';
import  ImageForm from './components/ImageForm/ImageForm';
import Rank from './components/Rank/Rank';
import FaceBrain from './components/FaceBrain/FaceBrain';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
	apiKey: 'd18ee4e71c09402a83622cb308b6dfb7'
});

const particleprops = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

class App extends Component {

	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'SignIn',
			isSignedIn: false,
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onRouteChange = (route) => {
		if (route === 'SignOut') {
			this.setState({isSignedIn: false});
		}
		else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(clarifaiFace);
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayBox = (box) => {
		this.setState({box: box});
		console.log(box);
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}
	render() {
		const { isSignedIn, box, route, imageUrl } = this.state;
		return (
			<div className="App">
				<Particles
					className="particles"
					params={particleprops}
				/>
					<Account isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
				{	route === 'home' ?
					<div>
						<AppLogo />
						<Rank />
						<ImageForm onInputChange = {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
						<FaceBrain box= {box} imageUrl = {imageUrl} />
					</div>
					:
					(
						route === 'SignIn' ?
						<SignIn  onRouteChange = {this.onRouteChange}/>
						:
						<Register  onRouteChange = {this.onRouteChange}/>
					)
					
				}
			</div>
		);
	}
}

export default App;
