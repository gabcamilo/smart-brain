import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange}) =>{
	return(
		<nav>
			<p onClick={()=> onRouteChange('signin')} className='f3 link dim black underline p3 pointer' >Sign Out</p>
		</nav>
	)
}

export default Navigation;

