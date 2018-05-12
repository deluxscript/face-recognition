import React from 'react';

const Account = ({onRouteChange, isSignedIn}) => {
	if  (isSignedIn) {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f4 pointer link pa3' onClick={ () => onRouteChange('SignOut')}>Sign Out</p>
			</nav>
		);
	}
	else {
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f4 pointer link pa3' onClick={ () => onRouteChange('SignIn')}>Sign In</p>
				<p className='f4 pointer link pa3' onClick={ () => onRouteChange('Register')}>Register</p>
			</nav>
		);
	}
}

export default Account;