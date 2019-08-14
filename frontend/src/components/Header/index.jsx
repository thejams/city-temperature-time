import React from 'react';
import image from '../../assets/images/sun.png'; 

const HeaderComponent = () => {
    return (
        <div className="header-top">
			<h2><img className="whe" src={image} alt="" />Weather</h2>
			
			<div className="clear"> </div>
		</div>
    );
}
 
export default HeaderComponent;