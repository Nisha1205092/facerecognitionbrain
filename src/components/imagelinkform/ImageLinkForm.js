import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className = 'w-60 center pa3'>
			<p className = 'f3'>
				{'This magic brain will detect faces. Give it a try'}
			</p>
			<div className = 'form br2 shadow-2 pa4 w-70 center'>
				<input className = 'w-70 center pa2 f4' type = 'text' onChange = {onInputChange}/>
				<button className = 'w-30 f4 grow ph3 link pv2 dib white bg-light-purple' onClick = {onButtonSubmit}>Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkForm;