import React from 'react';

import './Rank.css';


const Rank = ({name, entries}) => {
    return (
        <div className='rank'>
            <div className='white f3'>
                {`${name.toUpperCase()}, your current score is...`}
            </div>
            <div className=''>
                {entries}
            </div>
        </div>
    )
}

export default Rank;