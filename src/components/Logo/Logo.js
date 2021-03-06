import React from 'react';

import Tilt from 'react-tilt';

import './Logo.css';
import brain from './brain.png';

function Logo() {
    return (
        <div className='ma3 mt0'>
            <Tilt className="Tilt br2 shadow-3 pointer" options={{ max: 60}} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner">
                    <img className='logoImg' src={brain} alt='logo'/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;