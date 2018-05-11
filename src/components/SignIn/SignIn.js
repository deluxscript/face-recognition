import React, { Component } from 'react';

class SignIn extends Component {


	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			errorMsg: false
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	showError = (event) => {
		this.setState({errorMsg: true});
	}

	onSubmitSignIn = () => {
		fetch('http://localhost:3001/signin/', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(data => {
			if (data === 'success') {
				this.props.onRouteChange('home');
			}
			else {
				this.showError();
			}
		})
	}

	render(){

		const { onRouteChange } = this.props;
		const displayError = this.state.errorMsg ? {display: 'block'} : {display: 'none'};

		return(
			<article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw8 center">
				 <main className="pa4 black-80">
					<form className="measure center">
						   <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
									  <legend className="f2 fw6 ph0 mh0">Sign In</legend>
									   <div className="mt3">
										   <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
											 <input
											 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
											 type="email"
											 name="email-address"
											 id="email-address"
											 onChange={this.onEmailChange} />
									  </div>
									  <div className="mv3">
											 <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
												 <input
												 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
												 type="password"
												 name="password"
												 id="password"
												 onChange = {this.onPasswordChange} />
									   </div>
							</fieldset>
							<div className="">
									  <input
									  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									  type="submit"
									  value="Sign in"
									  onClick = {this.onSubmitSignIn} />
									  <p style = {displayError}>Your login credentials are wrong</p>
							</div>
							   <div className="lh-copy mt3">
									  <a onClick = { () => onRouteChange('Register') } className="f6 link dim black db pointer">Register</a>
							   </div>
					</form>
				 </main>
			</article>
		);

	}
}

export default SignIn;
