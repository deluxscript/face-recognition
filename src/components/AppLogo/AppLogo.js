import React from 'react';
import './assets/AppLogo.css';
import logo from './assets/logo.png';
import Tilt from 'react-tilt';

const AppLogo = () => {
	return(
		<Tilt className="Tilt shadow-2 br2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
			<div className="Tilt-inner pa3">
				<img style={{paddingTop: '5px'}} alt="logo" src={logo} />
			</div>
		</Tilt>
	);
}

export default AppLogo;