import React, { Component } from 'react';
import Modal from 'react-responsive-modal';


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

const initialstate = {
	input: '',
	open: false,
	imageUrl: '',
	box: {},
	Demo: {},
	route: 'SignIn',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
}

class App extends Component {

	constructor() {
		super();
		this.state = initialstate;
	}

	userDetails = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		});

	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onRouteChange = (route) => {
		if (route === 'SignOut') {
			this.setState(initialstate);
		}
		else if (route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: 478.53 + (clarifaiFace.left_col * width),
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	demographyDetails = (data) => {
		const age = data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name;
		const gender = data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name;
		const appearance = data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name;

		console.log('Age is', age);
		return {
			userAge: age,
			userGenger: gender,
			userAppearance: appearance
		}
	}

	displayBox = (box) => {
		this.setState({box: box});
	}

	displayDemographics = (Demo) => {
		this.setState({Demo: Demo});
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});
		this.onOpenModal();

		app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input)
			.then(response => {
				if (response) {
					fetch('https://limitless-basin-60633.herokuapp.com/image/', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
					.then(response => response.json())
					.then(count => {
						this.setState(Object.assign(this.state.user, {entries: count}))
					})
					.catch(err => console.log());
				}
				this.displayBox(this.calculateFaceLocation(response));
				this.displayDemographics(this.demographyDetails(response));
			})
			.catch(err => console.log(err));
	}
	render() {
		const { isSignedIn, box, route, imageUrl, Demo, open } = this.state;
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
						<Rank name={this.state.user.name} entries={this.state.user.entries}/>
						<ImageForm onInputChange = {this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>
						<Modal
							open={open}
							onClose={this.onCloseModal}
							center
							classNames={{
								transitionEnter: 'transition-enter',
								transitionEnterActive: 'transition-enter-active',
								transitionExit: 'transition-exit-active',
								transitionExitActive: 'transition-exit-active',
							}}
							animationDuration={1000}
						>
							<FaceBrain box= {box} Demo= {Demo} imageUrl = {imageUrl} />
						</Modal>
						
					</div>
					:
					(
						route === 'SignIn' ?
						<SignIn  onRouteChange = {this.onRouteChange} userDetails = {this.userDetails}/>
						:
						<Register  onRouteChange = {this.onRouteChange} userDetails = {this.userDetails}/>
					)
					
				}
			</div>
		);
	}
}

export default App;
