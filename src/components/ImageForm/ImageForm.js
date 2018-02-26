import React from 'react';
import './assets/ImageForm.css';

const ImageLink = () => {
	return(
		<div>
			<p className='f3'>
				{'Detect faces in your pictures by putting the image link in the box below'}
			</p>
			<div className="flex-center">
				<div className="form flex-center pa4 br3 shadow-5">
					<input type="text" className="pa2 f4 w-70" />
					<button className="pa2 w-30 f5 link dib grow">Detect Now</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLink;