import React from 'react';
import emptyImage from './empty.png';
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, box}) =>{
	const {leftCol, topRow, rightCol, bottomRow} = box;
	let customAtt='';
	if(!imageUrl){
		imageUrl=emptyImage;
		customAtt='bd3 shadow-2 pa4';
	}

	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img className={customAtt} id="inputImage" src={imageUrl} alt="" width='500px' height='auto'/>
				<div className='bounding-box' style={{top: topRow, right: rightCol, left: leftCol, bottom: bottomRow}}></div>
			</div>
		</div>
	)
}

export default FaceRecognition;

			