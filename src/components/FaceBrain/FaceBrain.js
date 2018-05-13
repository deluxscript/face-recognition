import React from 'react';
import './assets/FaceBrain.css';

const FaceBrain = ({ imageUrl, box, Demo }) => {
	return(
		<div>
			<p className="blk f3" style={{textAlign: 'center'}}>Results</p>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<p className="pa4 blk"><span style={{fontWeight: 'bold'}}>Age:</span><br/>{Demo.userAge} Years Old</p>
				<p className="pa4 blk"><span style={{fontWeight: 'bold'}}>Gender:</span><br/>{Demo.userGenger}</p>
				<p className="pa4 blk"><span style={{fontWeight: 'bold'}}>Appearance:</span><br/>{Demo.userAppearance}</p>
				<div>
					<img  id="inputimage" alt="" src={imageUrl} width="200px" height="auto"/>
					<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol, display: 'none'}}></div>
				</div>
			</div>
			{/* <div className="flex-center ma">
				<div className="absolute mt2">
					<img  id="inputimage" alt="" src={imageUrl} width="300px" height="auto"/>
					<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
				</div>
			</div> */}
		</div>
	);
}

export default FaceBrain;