import React from 'react';
import './Logo.css';
import Tilt from 'react-parallax-tilt';


const Logo = () => {
	return (
		<div className = 'ma4 mt2' style={{ height: '150px', width: '150px' }}>
			<Tilt className = 'Tilt br2 shadow-2'  glareEnable = 'true'>
		      <div style={{ height: '150px', width: '150px' }}>
		        <h2>Tilt 👀</h2>
		      </div>
		    </Tilt>
		</div>
		
	)
}

export default Logo;