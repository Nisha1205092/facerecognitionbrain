import React from 'react';
import './Logo.css';
import brain from './brain.png';
import Tilt from 'react-parallax-tilt';


const Logo = () => {
	return (
		<div className = 'ma4 mt2' style={{ height: '150px', width: '150px' }}>
			<Tilt className = 'Tilt br2 shadow-2'  glareEnable = 'true'>
		      <div className = 'pa4' style={{ height: '150px', width: '150px' }}>
		        <img src = {brain} alt = 'logo'/>
		      </div>
		    </Tilt>
		</div>
		
	)
}

export default Logo;