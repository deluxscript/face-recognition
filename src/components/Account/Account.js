import React from 'react';

const Account = ({onRouteChange}) => {
	return(
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p className='f3 pointer link' onClick={ () => onRouteChange('SignIn')}>Sign Out</p>
		</nav>
	);
}

export default Account;