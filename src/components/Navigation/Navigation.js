import React from 'react';

import './Navigation.css';

function Navigation({ onRouteChange, isSignedIn }) {
    
        if (isSignedIn){
            return (
                <nav>
                    <p onClick={()=>onRouteChange('signout')} className='f3 link dim pa3 pointer'>Sign Out</p>
                </nav>
            )
        } else {
            return (
                <nav>
                    <p onClick={()=>onRouteChange('signin')} className='f3 link dim pa3 pointer'>Sign In</p>
                    <p onClick={()=>onRouteChange('register')} className='f3 link dim pa3 pointer'>Register</p>
                </nav>
               
            );
        }
        
    
}

export default Navigation;