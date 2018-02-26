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
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
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
		return (
			<div className="App">
				<SignIn />
				<Particles
					className="particles"
					params={particleprops}
				/>
				<Account />
				<AppLogo />
				<Rank />
				<ImageForm onInputChange = {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
				<FaceBrain box= {this.state.box} imageUrl = {this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
