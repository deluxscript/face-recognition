import React from 'react';
import './assets/ImageForm.css';

const ImageLink = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className='f3'>
				{'This web App analyzes images and returns information on age, gender, and multicultural appearance'}
			</p>
			<div className="flex-center">
				<div className="form flex-center pa4 br3 shadow-5">
					<input type="text" className="pa2 f4 w-70" onChange={onInputChange} />
					<button className="pa2 w-30 f5 link dib grow" onClick = {onButtonSubmit}>Detect Now</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLink;