import React from 'react';
import Tilt from 'react-tilt';
import emptyImage from './empty.png';


const FaceRecognition = ({imageUrl}) =>{

	if(!imageUrl){
		imageUrl=emptyImage;
	}

	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img src={imageUrl} alt="tested image" width='500px' height='auto'/>
			</div>
		</div>
	)
}

export default FaceRecognition;

 