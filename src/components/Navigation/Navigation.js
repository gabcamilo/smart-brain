import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedIn}) =>{
	if (isSignedIn){
		return(
			<nav>
					<p onClick={()=> onRouteChange('login')} className='f3 link dim black underline pa3 pointer' >Logout</p>
			</nav>)
		}else{
			return(
				<nav>
					<p onClick={() => onRouteChange('login')} className='f3 link dim black underline pa3 pointer' >Login</p>
					<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
				</nav>
				)
		}
}
export default Navigation;

