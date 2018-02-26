import React from 'react';
import './assets/FaceBrain.css';

const FaceBrain = ({ imageUrl, box }) => {
	return(
		<div className="flex-center ma">
			<div className="absolute mt2">
				<img  id="inputimage" alt="" src={imageUrl} width="300px" height="auto"/>
				<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceBrain;