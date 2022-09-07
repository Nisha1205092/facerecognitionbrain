import React from 'react';


const ImageLinkForm = () => {
	return (
		<div>
			<p className = 'f3'>
				{'This magic brain will detect faces'}
			</p>
			<div className = 'w-50 center'>
				<input className = 'w-70 center pa2 f4' type = 'text' />
				<button className = 'w-30 f4 grow ph3 link pv2 dib white bg-light-purple'>Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkForm;