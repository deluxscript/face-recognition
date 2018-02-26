import React from 'react';
import './assets/FaceBrain.css';

const FaceBrain = ({ imageUrl, box, Demo }) => {
	return(
		<div>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<p className="pa4">Age: {Demo.userAge} Years Old</p>
				<p className="pa4"> Gender: {Demo.userGenger}</p>
				<p className="pa4">Appearance: {Demo.userAppearance}</p>
			</div>
			<div className="flex-center ma">
				<div className="absolute mt2">
					<img  id="inputimage" alt="" src={imageUrl} width="300px" height="auto"/>
					<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
				</div>
			</div>
		</div>
	);
}

export default FaceBrain;