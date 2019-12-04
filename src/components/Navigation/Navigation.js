import React from 'react';

import './Navigation.css';

function Navigation({ onRouteChange }) {
    return (
        <nav>
            <p onClick={()=>onRouteChange('signin')} className='f3 link dim pa3 pointer'>Sign Out</p>
        </nav>
    )
}

export default Navigation;