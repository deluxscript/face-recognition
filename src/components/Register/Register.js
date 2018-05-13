import React, {Component} from 'react';
import ReactLoading from 'react-loading';

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			registerEmail: '',
			registerPassword: '',
			registerName: '',
			errorMsg: false,
			regLoading: false
		}
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}

	showError = (event) => {
		this.setState({errorMsg: true});
	}

	showregLoading = (event) => {
		this.setState({regLoading: true});
	}

	onRegister = () => {
		this.showregLoading();
		fetch('https://limitless-basin-60633.herokuapp.com/register/', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.registerName
			})
		})
		.then(response => response.json())
		.then(user => {
			if (user.id) {
				this.props.userDetails(user)
				this.props.onRouteChange('home');
			}
			else {
				this.showError();
			}
		})
	}

	render() {

		const displayError = this.state.errorMsg ? {display: 'block'} : {display: 'none'};
		const showregloader = this.state.regLoading ? {display: 'block'} : {display: 'none'};

		return(
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 center">
				 <main className="pa4 black-80">
					<div className="measure center">
						   <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
									  <legend className="f2 fw6 ph0 mh0">Register</legend>
								   <div className="mt3">
									   <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
											 <input
											 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											 type="text"
											 name="name"
											 id="name"
											 onChange={this.onNameChange}
											 />
								  </div>
								  <div className="mt3">
									   <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
											 <input
											 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											 type="email"
											 name="email-address"
											 id="email-address"
											 onChange={this.onEmailChange}
											  />
								  </div>
								  <div className="mv3">
											 <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
												 <input
												 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
												 type="password"
												 name="password"
												 id="password"
												 onChange={this.onPasswordChange}
												  />
								  </div>
							</fieldset>
							<div className="">
									  <input
									  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									  type="submit"
									  value="Register"
									  onClick = {this.onRegister}
									  />
									  <div style = {showregloader}>
									  	<ReactLoading type="bars" color="#fff"/>
									  </div>
										<p style = {displayError}>All fields are required</p>
							</div>
					</div>
				 </main>
			</article>
		);

	}
} 

export default Register;
